import os
import re

def clean_empty_li(directory):
    # Regex to find empty <li> blocks (possibly with whitespace)
    # <li>\s*</li>
    pattern = re.compile(r'<li>\s*</li>', re.DOTALL)

    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.html'):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    new_content = pattern.sub('', content)
                    
                    if new_content != content:
                        with open(file_path, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"Cleaned empty li in {file_path}")
                except Exception as e:
                    print(f"Error processing {file_path}: {e}")

clean_empty_li(r'd:\Horse riding stable')
