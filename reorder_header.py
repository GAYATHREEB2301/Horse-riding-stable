import os
import re

def reorder_header(directory):
    # This script will:
    # 1. Extract the theme-toggle and login button from .nav-links
    # 2. Place them into .nav-controls before the hamburger
    
    # Regex to find the theme-toggle li and nav-login li inside nav-links
    # The theme-toggle matches: <li>\s*<button class="theme-toggle".*?</button>\s*</li>
    # The login matches: <li><a href="login.html" class="nav-login">.*?</a></li>
    
    toggle_pattern = re.compile(r'<li>\s*<button class="theme-toggle".*?</button>\s*</li>', re.DOTALL)
    login_pattern = re.compile(r'<li>\s*<a href="login.html" class="nav-login">.*?</a>\s*</li>', re.DOTALL)
    
    # We also need to extract just the inner content (the toggle button and the link) to put in nav-controls
    toggle_inner_pattern = re.compile(r'<button class="theme-toggle".*?</button>', re.DOTALL)
    login_inner_pattern = re.compile(r'<a href="login.html" class="nav-login">.*?</a>', re.DOTALL)

    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.html'):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    # Extract toggle and login
                    toggle_match = toggle_inner_pattern.search(content)
                    login_match = login_inner_pattern.search(content)
                    
                    if not toggle_match or not login_match:
                        continue
                        
                    toggle_html = toggle_match.group(0)
                    login_html = login_match.group(0)
                    
                    # Remove the <li> wrappers from nav-links
                    new_content = toggle_pattern.sub('', content)
                    new_content = login_pattern.sub('', new_content)
                    
                    # Add them to nav-controls
                    # Find <div class="nav-controls"> and insert them before the button
                    nav_controls_pattern = re.compile(r'(<div class="nav-controls">)\s*(<button class="hamburger")', re.DOTALL)
                    # We insert toggle then login
                    insertion = f'\\1\n      {toggle_html}\n      {login_html}\n      \\2'
                    new_content = nav_controls_pattern.sub(insertion, new_content)
                    
                    if new_content != content:
                        with open(file_path, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"Updated header arrangement in {file_path}")
                except Exception as e:
                    print(f"Error processing {file_path}: {e}")

reorder_header(r'd:\Horse riding stable')
