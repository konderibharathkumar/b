from flask import Flask, render_template

app = Flask(__name__)

# Sample data for your portfolio
projects = [
    {
        'title': 'ETL Pipeline for Sales Data',
        'description': 'Built an automated ETL pipeline using Python and Apache Airflow to process daily sales data from multiple sources.',
        'technologies': ['Python', 'Apache Airflow', 'PostgreSQL', 'Pandas'],
        'github_link': 'https://github.com/yourusername/sales-etl-pipeline'
    },
    {
        'title': 'Real-time Data Streaming',
        'description': 'Implemented real-time data streaming solution using Kafka and Spark for processing customer events.',
        'technologies': ['Apache Kafka', 'Apache Spark', 'Python', 'AWS'],
        'github_link': 'https://github.com/yourusername/realtime-streaming'
    },
    {
        'title': 'Data Warehouse Migration',
        'description': 'Led migration of legacy data warehouse to cloud-based solution, improving query performance by 60%.',
        'technologies': ['AWS Redshift', 'Python', 'SQL', 'Docker'],
        'github_link': 'https://github.com/yourusername/warehouse-migration'
    }
]

experience = [
    {
        'role': 'Senior Data Engineer',
        'company': 'Tech Company',
        'duration': '2022 - Present',
        'responsibilities': [
            'Design and implement ETL pipelines processing 10TB+ daily data',
            'Optimize data warehouse queries reducing execution time by 40%',
            'Mentor junior engineers on best practices'
        ]
    },
    {
        'role': 'Data Engineer',
        'company': 'Previous Company',
        'duration': '2020 - 2022',
        'responsibilities': [
            'Built automated data pipelines using Python and Apache Airflow',
            'Implemented data quality checks and monitoring systems',
            'Collaborated with data scientists on ML model deployment'
        ]
    }
]

skills = {
    'Programming': ['Python', 'SQL', 'Scala', 'Java'],
    'Big Data': ['Apache Spark', 'Apache Kafka', 'Hadoop', 'Apache Airflow'],
    'Cloud': ['AWS', 'Azure', 'Google Cloud Platform'],
    'Databases': ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'],
    'Tools': ['Docker', 'Kubernetes', 'Git', 'Jenkins']
}

@app.route('/')
def home():
    return render_template('index.html', projects=projects[:2])

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

if __name__ == '__main__':
    app.run(debug=True)