#!/usr/bin/env python3
"""Set publish dates for blog posts that don't have one yet.

Scans content/blog/ for non-draft posts with a missing or empty `date` field
and sets it to the current UTC timestamp. Intended to run in CI on push to
master so the date reflects the actual publish date rather than when the
article was written.
"""
import os
import re
import sys
from datetime import datetime, timezone

BLOG_DIR = "content/blog"


def main():
    today = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    changed = False

    for filename in sorted(os.listdir(BLOG_DIR)):
        if not filename.endswith(".md"):
            continue

        filepath = os.path.join(BLOG_DIR, filename)
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()

        # Match YAML frontmatter block
        match = re.match(r"^---\n(.*?)\n---", content, re.DOTALL)
        if not match:
            continue

        frontmatter = match.group(1)

        # Skip drafts
        if re.search(r"^draft:\s*true\s*$", frontmatter, re.MULTILINE | re.IGNORECASE):
            print(f"Skipping draft: {filename}")
            continue

        # Skip if date is already set (non-empty)
        date_match = re.search(r"^date:\s*(.+)$", frontmatter, re.MULTILINE)
        if date_match and date_match.group(1).strip():
            continue

        # Set the date
        if date_match:
            # Replace the empty date line
            new_frontmatter = re.sub(
                r"^date:.*$", f"date: {today}", frontmatter, flags=re.MULTILINE
            )
        else:
            # Insert date after title if present, otherwise at top
            title_match = re.search(r"^title:.*$", frontmatter, re.MULTILINE)
            if title_match:
                insert_pos = title_match.end()
                new_frontmatter = (
                    frontmatter[:insert_pos]
                    + f"\ndate: {today}"
                    + frontmatter[insert_pos:]
                )
            else:
                new_frontmatter = f"date: {today}\n" + frontmatter

        new_content = (
            content[: match.start(1)] + new_frontmatter + content[match.end(1) :]
        )

        with open(filepath, "w", encoding="utf-8") as f:
            f.write(new_content)

        print(f"Set publish date for {filename}: {today}")
        changed = True

    # Signal to GitHub Actions whether any files were changed
    github_output = os.environ.get("GITHUB_OUTPUT", "")
    if github_output:
        with open(github_output, "a") as f:
            f.write(f'changed={"true" if changed else "false"}\n')

    return 0


if __name__ == "__main__":
    sys.exit(main())
