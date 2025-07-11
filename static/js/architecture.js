// Simple Architecture
document.addEventListener('DOMContentLoaded', function() {
    
    const componentDetails = {
        'oracle-fusion': { title: 'Oracle Fusion Cloud', content: '<p>Enterprise ERP system processing 2TB+ daily transactions.</p>' },
        'oracle-ebs': { title: 'Oracle E-Business Suite', content: '<p>Legacy system with 500GB+ historical data.</p>' },
        'postgresql': { title: 'PostgreSQL Database', content: '<p>High-performance database with 10K+ TPS.</p>' },
        'sharepoint': { title: 'Microsoft SharePoint', content: '<p>Document management with 10K+ files monthly.</p>' },
        'sftp': { title: 'SFTP File Sources', content: '<p>Secure file transfer with 100+ files daily.</p>' },
        'matillion': { title: 'Matillion ETL', content: '<p>Cloud-native ETL with 50+ orchestration jobs.</p>' },
        'python': { title: 'Python Scripts', content: '<p>Custom processing with 30+ automated scripts.</p>' },
        'sql': { title: 'SQL Transformations', content: '<p>Advanced SQL with optimized query performance.</p>' },
        'incoming': { title: 'Incoming Layer', content: '<p>Raw data landing zone with 5TB+ daily ingestion.</p>' },
        'silver': { title: 'Silver Layer', content: '<p>Cleansed data with 98.5% accuracy.</p>' },
        'goldstg': { title: 'Gold STG Layer', content: '<p>Business transformation stage.</p>' },
        'gold': { title: 'Gold Layer', content: '<p>Analytics-ready curated data.</p>' },
        'powerbi': { title: 'Power BI', content: '<p>20+ executive dashboards for 500+ users.</p>' },
        'datascience': { title: 'Data Science', content: '<p>ML models with 92% prediction accuracy.</p>' }
    };

    // Draw connection lines between Snowflake circles
    function drawSnowflakeConnection() {
        const circles = ['incoming', 'silver', 'goldstg', 'gold'];
        const container = document.querySelector('.architecture-grid'); // Main container
        
        // Remove existing lines and particles
        container.querySelectorAll('.connection-line, .data-particle').forEach(el => el.remove());
        
        // Remove old animation styles
        document.querySelectorAll('style[data-particle]').forEach(style => style.remove());
        
        // Draw line between each consecutive pair
        for (let i = 0; i < circles.length - 1; i++) {
            const fromCircle = document.getElementById(circles[i]);
            const toCircle = document.getElementById(circles[i + 1]);
            
            if (fromCircle && toCircle) {
                const fromRect = fromCircle.getBoundingClientRect();
                const toRect = toCircle.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();
                
                const startX = fromRect.left + fromRect.width/2 - containerRect.left;
                const endX = toRect.left + toRect.width/2 - containerRect.left;
                const y = fromRect.top + fromRect.height/2 - containerRect.top;
                
                // Add animated particle
                    // Add animated snowflake particle
                    const particle = document.createElement('i');
                    particle.className = 'fas fa-snowflake data-particle';
                    particle.style.position = 'absolute';
                    particle.style.fontSize = '12px';
                    particle.style.color = '#29B5E8';
                    particle.style.zIndex = '3';
                    particle.style.textShadow = '0 0 8px #29B5E8';
                    particle.style.left = (startX - 6) + 'px';
                    particle.style.top = (fromRect.top + fromRect.height/2 - containerRect.top - 6) + 'px';
                    particle.style.animation = `moveSnowflake${i} 3s linear infinite`;
                    
                    // Create keyframe animation for vertical movement
                    const style = document.createElement('style');
                    style.setAttribute('data-particle', 'true');
                    const deltaX = endX - startX;
                    const deltaY = (toRect.top + toRect.height/2 - containerRect.top) - (fromRect.top + fromRect.height/2 - containerRect.top);
                    style.textContent = `
                        @keyframes moveSnowflake${i} {
                            0% { transform: translate(0px, 0px) rotate(0deg); opacity: 0; }
                            10% { opacity: 1; }
                            90% { opacity: 1; }
                            100% { transform: translate(${deltaX}px, ${deltaY}px) rotate(360deg); opacity: 0; }
                        }
                    `;
                    document.head.appendChild(style);
                    
                    container.appendChild(particle);
            }
        }
    }
    
    // Draw connection after page loads
    setTimeout(drawSnowflakeConnection, 100);
    
    // Redraw on resize
    window.addEventListener('resize', () => {
        setTimeout(drawSnowflakeConnection, 100);
    });

    // Connection paths for hover effects
    const connectionPaths = {
        'oracle-fusion': ['oracle-fusion', 'matillion', 'incoming', 'silver', 'goldstg', 'gold'],
        'oracle-ebs': ['oracle-ebs', 'python', 'incoming', 'silver', 'goldstg', 'gold'],
        'postgresql': ['postgresql', 'sql', 'silver', 'goldstg', 'gold'],
        'sharepoint': ['sharepoint', 'matillion', 'incoming', 'silver', 'goldstg', 'gold'],
        'sftp': ['sftp', 'python', 'incoming', 'silver', 'goldstg', 'gold'],
        'matillion': ['matillion', 'incoming', 'silver', 'goldstg', 'gold'],
        'python': ['python', 'incoming', 'silver', 'goldstg', 'gold'],
        'sql': ['sql', 'silver', 'goldstg', 'gold'],
        'incoming': ['incoming', 'silver', 'goldstg', 'gold'],
        'silver': ['silver', 'goldstg', 'gold'],
        'goldstg': ['goldstg', 'gold'],
        'gold': ['gold', 'powerbi', 'datascience'],
        'powerbi': ['powerbi'],
        'datascience': ['datascience']
    };

    // Add hover effects
    document.querySelectorAll('.node').forEach(node => {
        node.addEventListener('mouseenter', function() {
            const type = this.getAttribute('data-type');
            const path = connectionPaths[type] || [];
            
            // Dim all nodes
            document.querySelectorAll('.node').forEach(n => {
                n.style.opacity = '0.3';
                n.style.transform = 'scale(0.9)';
            });
            
            // Highlight path nodes
            path.forEach(nodeId => {
                const pathNode = document.getElementById(nodeId);
                if (pathNode) {
                    pathNode.style.opacity = '1';
                    pathNode.style.transform = 'scale(1.1)';
                    pathNode.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.8)';
                }
            });
        });
        
        node.addEventListener('mouseleave', function() {
            // Reset all nodes
            document.querySelectorAll('.node').forEach(n => {
                n.style.opacity = '1';
                n.style.transform = 'scale(1)';
                n.style.boxShadow = 'none';
            });
        });
        
        node.addEventListener('click', function(e) {
            e.stopPropagation();
            const type = this.getAttribute('data-type');
            if (componentDetails[type]) {
                const rect = this.getBoundingClientRect();
                showInfoPopup(componentDetails[type], rect, type);
            }
        });
    });
    
    // Info popup functions
    function showInfoPopup(details, rect, type) {
        const popup = document.getElementById('infoPopup');
        const header = popup.querySelector('.popup-header');
        
        // Set content
        document.getElementById('popupTitle').textContent = details.title;
        document.getElementById('popupBody').innerHTML = details.content;
        
        // Set color based on circle type
        const colors = {
            'oracle-fusion': 'linear-gradient(135deg, #ef4444, #dc2626)',
            'oracle-ebs': 'linear-gradient(135deg, #f97316, #ea580c)',
            'postgresql': 'linear-gradient(135deg, #3b82f6, #2563eb)',
            'sharepoint': 'linear-gradient(135deg, #0ea5e9, #0284c7)',
            'sftp': 'linear-gradient(135deg, #10b981, #059669)',
            'matillion': 'linear-gradient(135deg, #f59e0b, #d97706)',
            'python': 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
            'sql': 'linear-gradient(135deg, #06b6d4, #0891b2)',
            'incoming': 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
            'silver': 'linear-gradient(135deg, #64748b, #475569)',
            'goldstg': 'linear-gradient(135deg, #eab308, #ca8a04)',
            'gold': 'linear-gradient(135deg, #f59e0b, #d97706)',
            'powerbi': 'linear-gradient(135deg, #eab308, #ca8a04)',
            'datascience': 'linear-gradient(135deg, #a855f7, #9333ea)'
        };
        
        // Apply circle color to entire popup
        const circleColor = colors[type] || 'linear-gradient(135deg, #10b981, #059669)';
        popup.style.background = circleColor;
        header.style.background = 'rgba(255,255,255,0.2)';
        popup.style.border = 'none';
        
        // Position popup ON TOP OF the circle (overlapping)
        let left;
        
        // For Data Consumers circles, show popup on left side
        if (type === 'powerbi' || type === 'datascience') {
            left = rect.left - 410; // Show to the left of circle
        } else {
            left = rect.left + rect.width/2 - 200; // Center on other circles
        }
        
        // Ensure popup stays within screen bounds
        left = Math.max(10, Math.min(left, window.innerWidth - 410));
        
        popup.style.position = 'fixed';
        popup.style.left = left + 'px';
        popup.style.top = rect.top + 'px';
        popup.style.zIndex = '10000';
        popup.style.maxWidth = '400px';
        popup.style.width = '400px';
        
        popup.style.display = 'block';
    }
    
    function hideInfoPopup() {
        document.getElementById('infoPopup').style.display = 'none';
    }
    
    // Close popup events
    document.querySelector('.popup-close').addEventListener('click', hideInfoPopup);
    
    // Close when clicking outside popup
    document.addEventListener('click', function(e) {
        const popup = document.getElementById('infoPopup');
        if (!popup.contains(e.target) && popup.style.display === 'block') {
            hideInfoPopup();
        }
    });
    
    // Close with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hideInfoPopup();
        }
    });
});