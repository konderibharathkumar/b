#!/usr/bin/env python3
"""
Generate static HTML files from Flask app for GitHub Pages deployment
"""

import os
from app import app

def generate_static_files():
    """Generate static HTML files from Flask routes"""
    
    # Create output directory
    output_dir = 'static_site'
    os.makedirs(output_dir, exist_ok=True)
    
    # Routes to generate
    routes = {
        '/': 'index.html',
        '/projects': 'projects.html',
        '/experience': 'experience.html', 
        '/skills': 'skills.html',
        '/contact': 'contact.html',
        '/architecture': 'architecture.html'
    }
    
    with app.test_client() as client:
        for route, filename in routes.items():
            print(f"Generating {filename}...")
            
            # Get HTML content from Flask route
            response = client.get(route)
            
            if response.status_code == 200:
                html_content = response.get_data(as_text=True)
                
                # Fix asset paths for GitHub Pages
                html_content = html_content.replace('{{ url_for(\'static\', filename=\'', 'static/')
                html_content = html_content.replace('\') }}', '')
                html_content = html_content.replace('href="{{ url_for(\'', 'href="')
                html_content = html_content.replace('\') }}"', '.html"')
                
                # Write to file
                with open(os.path.join(output_dir, filename), 'w', encoding='utf-8') as f:
                    f.write(html_content)
                    
                print(f"✅ Generated {filename}")
            else:
                print(f"❌ Failed to generate {filename} (Status: {response.status_code})")
    
    print(f"\n🎉 Static files generated in '{output_dir}' directory")
    print("📁 Copy contents to your GitHub repository root")

if __name__ == '__main__':
    generate_static_files()