# Data Engineer Portfolio

A professional portfolio website built with Python Flask to showcase data engineering projects, experience, and skills.

## Features

- **Home Page**: Overview with recent projects and quick stats
- **Projects**: Detailed view of data engineering projects
- **Experience**: Professional background and achievements
- **Skills**: Technical skills organized by category
- **Contact**: Contact information and quick message form

## Technologies Used

- **Backend**: Python Flask
- **Frontend**: HTML5, CSS3, Bootstrap 5
- **Deployment**: Heroku/Render ready with Procfile and requirements.txt

## Local Development

1. Clone the repository:
```bash
git clone https://github.com/yourusername/data-engineer-portfolio.git
cd data-engineer-portfolio
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the application:
```bash
python app.py
```

5. Open your browser and go to `http://localhost:5000`

## Deployment

### Heroku
1. Create a Heroku account and install Heroku CLI
2. Login to Heroku: `heroku login`
3. Create a new app: `heroku create your-portfolio-name`
4. Deploy: `git push heroku main`

### Render
1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Use the following settings:
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn app:app`

## Customization

1. Update the project data in `app.py`
2. Replace placeholder links with your actual GitHub/LinkedIn profiles
3. Modify the styling in `static/css/style.css`
4. Add your own project screenshots to `static/images/`

## Project Structure

```
data-engineer-portfolio/
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── Procfile              # Heroku deployment config
├── runtime.txt           # Python version specification
├── README.md             # Project documentation
├── templates/            # HTML templates
│   ├── base.html
│   ├── index.html
│   ├── projects.html
│   ├── experience.html
│   ├── skills.html
│   └── contact.html
└── static/               # Static files
    └── css/
        └── style.css
```

## License

This project is open source and available under the [MIT License](LICENSE).