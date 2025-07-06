#!/usr/bin/env python3
"""
Generate static HTML files from Flask app for GitHub Pages
"""
import os
from app import app

def generate_static_site():
    """Generate static HTML files from Flask routes"""
    
    # Create output directory
    os.makedirs('docs', exist_ok=True)
    
    # Routes to generate
    routes = {
        '/': 'index.html',
        '/projects': 'projects.html',
        '/experience': 'experience.html', 
        '/skills': 'skills.html',
        '/contact': 'contact.html'
    }
    
    with app.test_client() as client:
        for route, filename in routes.items():
            print(f"Generating {filename}...")
            response = client.get(route)
            
            if response.status_code == 200:
                html_content = response.get_data(as_text=True)
                
                # Fix paths for GitHub Pages
                html_content = html_content.replace('/static/', './static/')
                html_content = html_content.replace('href="/', 'href="./')
                html_content = html_content.replace('href="/projects', 'href="./projects.html')
                html_content = html_content.replace('href="/experience', 'href="./experience.html')
                html_content = html_content.replace('href="/skills', 'href="./skills.html')
                html_content = html_content.replace('href="/contact', 'href="./contact.html')
                html_content = html_content.replace('href="./"', 'href="./index.html"')
                
                with open(f'docs/{filename}', 'w', encoding='utf-8') as f:
                    f.write(html_content)
                print(f"✅ {filename} generated successfully")
            else:
                print(f"❌ Error generating {filename}: {response.status_code}")
    
    # Copy static files
    import shutil
    if os.path.exists('docs/static'):
        shutil.rmtree('docs/static')
    shutil.copytree('static', 'docs/static')
    print("✅ Static files copied")
    
    print("\n🎉 Static site generated in 'docs' folder!")
    print("📁 Files created:")
    for file in os.listdir('docs'):
        if file.endswith('.html'):
            print(f"   - {file}")

if __name__ == '__main__':
    generate_static_site()