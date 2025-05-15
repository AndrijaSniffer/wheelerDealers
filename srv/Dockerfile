# Use official Python 3.13 image
FROM python:3.13

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set work directory inside the container
WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt /app/
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire Django project code into the container
COPY . /app/

# Expose port 8000 for Django
EXPOSE 8000

# Default command to run Django development server
CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]
