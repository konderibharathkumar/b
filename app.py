from flask import Flask, render_template, send_file
import os

app = Flask(__name__)

# Portfolio data for Bharath Kumar
projects = [
    {
        'title': 'Cloud Data Pipeline with Snowflake',
        'description': 'Designed and implemented scalable ETL pipelines using Matillion and Snowflake for enterprise data processing.',
        'technologies': ['Snowflake', 'Matillion', 'Python', 'SQL']
    },
    {
        'title': 'Automated Data Quality Framework',
        'description': 'Built comprehensive data quality monitoring system with automated alerts and remediation workflows.',
        'technologies': ['Python', 'Matillion', 'PostgreSQL', 'Power Automate', 'Power BI']
    },
    {
        'title': 'ServiceNow Integration Platform',
        'description': 'Developed integration solutions connecting ServiceNow with multiple data sources for real-time analytics.',
        'technologies': ['ServiceNow', 'Python', 'REST APIs', 'SQL']
    }
]

experience = [
    {
        'role': 'Data Engineer',
        'company': 'Capgemini (Client: Vertiv)',
        'duration': 'July 2021 - July 2025',
        'responsibilities': [
            'Design and implement enterprise ETL pipelines using Matillion and Snowflake for Vertiv',
            'Process 5TB+ daily data with optimized performance achieving 50% query time reduction',
            'Built ServiceNow integrations for real-time data synchronization and reporting',
            'Developed comprehensive data quality monitoring and alerting systems',
            'Maintained and optimized PostgreSQL database systems for high-volume operations'
        ]
    }
]

skills = {
    'Programming Languages': ['Python', 'SQL', 'Shell Scripting'],
    'Cloud Data Platforms': ['Snowflake'],
    'ETL & Data Integration': ['Matillion', 'Informatica', 'DataZap'],
    'Databases': ['PostgreSQL', 'MySQL', 'Oracle Database'],
    'Enterprise Systems': ['Oracle Fusion Cloud', 'Oracle EBS', 'ServiceNow'],
    'Development Tools': ['Git', 'Jira']
}

@app.route('/')
def home():
    return render_template('index.html', projects=projects[:2], name='Bharath Kumar')

@app.route('/projects')
def projects_page():
    return render_template('projects.html', projects=projects)

@app.route('/experience')
def experience_page():
    return render_template('experience.html', experience=experience)

@app.route('/skills')
def skills_page():
    return render_template('skills.html', skills=skills)

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/architecture')
def architecture():
    return render_template('architecture.html')

@app.route('/resume')
def resume():
    resume_path = os.path.join(app.root_path, 'Bharath_Kumar_Konderi_CV_2025.pdf')
    return send_file(resume_path, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)
