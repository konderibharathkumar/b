#!/usr/bin/env python3
"""
Quick test script to check architecture page
"""
from app import app

def test_architecture_page():
    """Test the architecture page rendering"""
    with app.test_client() as client:
        response = client.get('/architecture')
        
        print("=== Architecture Page Test ===")
        print(f"Status Code: {response.status_code}")
        print(f"Content Length: {len(response.data)} bytes")
        
        if response.status_code == 200:
            content = response.get_data(as_text=True)
            
            # Check for key elements
            checks = {
                'Architecture container': 'architecture-container' in content,
                'Source icons': 'source-icon' in content,
                'ETL icons': 'etl-icon' in content,
                'Layer icons': 'layer-icon' in content,
                'Consumer icons': 'consumer-icon' in content,
                'CSS loaded': 'architecture.css' in content,
                'JS loaded': 'architecture.js' in content,
                'Modal present': 'archModal' in content
            }
            
            print("\n=== Element Checks ===")
            for check, result in checks.items():
                status = "✅ PASS" if result else "❌ FAIL"
                print(f"{check}: {status}")
            
            # Check for potential issues
            issues = []
            if 'overflow: hidden' not in content:
                issues.append("Missing overflow control")
            if 'height: 100vh' in content:
                issues.append("Full viewport height might cause issues")
            if len([line for line in content.split('\n') if 'animation' in line]) > 10:
                issues.append("Too many animations detected")
            
            if issues:
                print("\n=== Potential Issues ===")
                for issue in issues:
                    print(f"⚠️  {issue}")
            else:
                print("\n✅ No obvious issues detected")
                
        else:
            print("❌ Page failed to load")

if __name__ == '__main__':
    test_architecture_page()