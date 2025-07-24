document.addEventListener('DOMContentLoaded', function() {
    // Add particle effects around the name
    function createParticles() {
        const heroSection = document.querySelector('.hero-section');
        if (!heroSection) return;
        
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particle-container';
        heroSection.appendChild(particleContainer);
        
        // Create particles
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random position
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            
            // Random size
            const size = Math.random() * 8 + 2;
            
            // Random animation duration
            const duration = Math.random() * 10 + 5;
            
            // Random color
            const colors = ['#667eea', '#764ba2', '#23a6d5', '#23d5ab', '#ffffff'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            // Apply styles
            particle.style.cssText = `
                position: absolute;
                top: ${posY}%;
                left: ${posX}%;
                width: ${size}px;
                height: ${size}px;
                background-color: ${color};
                border-radius: 50%;
                opacity: ${Math.random() * 0.5 + 0.2};
                animation: float ${duration}s infinite ease-in-out;
                animation-delay: ${Math.random() * 5}s;
                pointer-events: none;
                z-index: 5;
            `;
            
            particleContainer.appendChild(particle);
        }
        
        // Add CSS for particle animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0% { transform: translateY(0) translateX(0) rotate(0); opacity: 0.2; }
                25% { transform: translateY(-20px) translateX(10px) rotate(90deg); opacity: 0.5; }
                50% { transform: translateY(-40px) translateX(-10px) rotate(180deg); opacity: 0.8; }
                75% { transform: translateY(-20px) translateX(-20px) rotate(270deg); opacity: 0.5; }
                100% { transform: translateY(0) translateX(0) rotate(360deg); opacity: 0.2; }
            }
            
            .particle-container {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                overflow: hidden;
                pointer-events: none;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Call the function to create particles
    createParticles();
    const tools = [
        {
            name: 'Snowflake',
            icon: 'fas fa-snowflake',
            class: 'snowflake',
            description: 'Cloud-based data warehouse platform for scalable analytics.',
            experience: 'At Capgemini: Designed enterprise ETL pipelines processing 5TB+ daily data. Optimized Snowflake queries achieving 50% performance improvement and implemented automated data loading workflows.'
        },
        {
            name: 'Python',
            icon: 'fab fa-python',
            class: 'python',
            description: 'Primary programming language for data engineering and automation.',
            experience: 'Daily use: Developed 30+ automated ETL pipelines using Python with Pandas, SQLAlchemy. Built data quality monitoring systems and API integrations for enterprise applications.'
        },
        {
            name: 'PostgreSQL',
            icon: 'fas fa-database',
            class: 'postgresql',
            description: 'Advanced relational database for enterprise data storage.',
            experience: 'Production experience: Maintained PostgreSQL systems handling high-volume transactions. Optimized complex queries and implemented database performance tuning for data warehouse operations.'
        },
        {
            name: 'Oracle Fusion',
            icon: 'fas fa-database',
            class: 'oracle',
            description: 'Oracle Cloud Applications including ERP, HCM, and Supply Chain Management.',
            experience: 'Enterprise integration: Built data pipelines connecting Oracle Fusion Cloud (OSC/ERP) and Oracle EBS systems. Developed automated data extraction and transformation processes for financial and operational reporting.'
        },
        {
            name: 'ServiceNow',
            icon: 'fas fa-cogs',
            class: 'servicenow',
            description: 'Enterprise service management and workflow automation platform.',
            experience: 'Integration specialist: Built real-time data synchronization between ServiceNow and data warehouses. Developed custom APIs and automated incident management workflows.'
        },
        {
            name: 'Matillion',
            icon: 'fas fa-stream',
            class: 'matillion',
            description: 'Cloud-native ETL platform for data transformation.',
            experience: 'Lead implementer: Architected enterprise ETL pipelines using Matillion for Snowflake integration. Reduced data processing time by 40% through optimized transformation workflows.'
        }
    ];

    // Create floating logos container
    const container = document.createElement('div');
    container.className = 'floating-logos';
    document.body.appendChild(container);

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'tool-modal';
    modal.innerHTML = `
        <div class="tool-modal-content">
            <span class="tool-modal-close">&times;</span>
            <div id="modal-content"></div>
        </div>
    `;
    document.body.appendChild(modal);

    // Create floating logos
    tools.forEach((tool, index) => {
        const logo = document.createElement('i');
        logo.className = `floating-logo ${tool.class} ${tool.icon}`;
        logo.title = tool.name;
        logo.addEventListener('click', (e) => {
            e.stopPropagation();
            showModal(tool);
        });
        logo.addEventListener('mouseenter', () => {
            logo.style.animationPlayState = 'paused';
            logo.style.opacity = '1';
        });
        logo.addEventListener('mouseleave', () => {
            logo.style.animationPlayState = 'running';
            logo.style.opacity = '0.3';
        });
        container.appendChild(logo);
    });

    function showModal(tool) {
        const content = document.getElementById('modal-content');
        content.innerHTML = `
            <i class="${tool.icon} fa-4x ${tool.class} mb-3" style="opacity: 1;"></i>
            <h3>${tool.name}</h3>
            <p class="text-muted">${tool.description}</p>
            <hr>
            <h5>My Experience:</h5>
            <p>${tool.experience}</p>
        `;
        modal.style.display = 'block';
    }

    // Close modal events
    modal.querySelector('.tool-modal-close').addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});