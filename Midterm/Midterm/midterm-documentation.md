# Midterm Project Documentation

## Project Overview
For my midterm project, I created a photography portfolio website for my 35mm film work. The goal of the site is to present my images in a bold, modern layout while keeping the focus on the photographs themselves. I wanted the design to feel clean and visually strong, with smooth transitions and an interactive photo detail view.

## Demo / Progress
The current version of the site includes a homepage, a gallery section, an about section, and a contact section. The gallery displays selected photographs in a responsive grid layout. When a user clicks on an image, a larger detail view opens in a modal with the title, medium, and description of the photograph.

## Code Snippet
One code feature I worked on was creating a mobile media query so the gallery layout adjusts for smaller screens.

```css
@media (max-width: 768px) {
  .gallery-grid {
    grid-template-columns: 1fr;
  }

  .modal-content {
    grid-template-columns: 1fr;
  }
}