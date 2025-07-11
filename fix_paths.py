#!/usr/bin/env python3
"""
Fix asset paths in all HTML files for GitHub Pages
"""

import os
import glob

def fix_paths():
    """Fix all asset paths in HTML files"""
    
    html_files = glob.glob('*.html')
    
    for file in html_files:
        print(f"Fixing paths in {file}...")
        
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Fix asset paths
        content = content.replace('href="/static/', 'href="static/')
        content = content.replace('src="/static/', 'src="static/')
        content = content.replace('href="./static/', 'href="static/')
        content = content.replace('src="./static/', 'src="static/')
        
        # Fix navigation links
        content = content.replace('href="/"', 'href="index.html"')
        content = content.replace('href="/projects"', 'href="projects.html"')
        content = content.replace('href="/experience"', 'href="experience.html"')
        content = content.replace('href="/skills"', 'href="skills.html"')
        content = content.replace('href="/contact"', 'href="contact.html"')
        content = content.replace('href="/architecture"', 'href="architecture.html"')
        
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"✅ Fixed {file}")
    
    print(f"\n🎉 Fixed paths in {len(html_files)} HTML files")

if __name__ == '__main__':
    fix_paths()