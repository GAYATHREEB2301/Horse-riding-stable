import os

def update_favicon(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.html'):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    # Replace favicon.svg with logo.png and fix the type attribute if it exists
                    new_content = content.replace('favicon.svg', 'logo.png')
                    new_content = new_content.replace('type="image/svg+xml"', 'type="image/png"')
                    
                    if new_content != content:
                        with open(file_path, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"Updated favicon in {file_path}")
                except Exception as e:
                    print(f"Error processing {file_path}: {e}")

update_favicon(r'd:\Horse riding stable')
