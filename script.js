// Theme toggle, mobile nav, form handling, simple animations
(function(){
  const root = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('nav-toggle');
  const yearEl = document.getElementById('year');
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  yearEl.textContent = new Date().getFullYear();

  // Initialize theme
  const stored = localStorage.getItem('theme');
  if(stored) document.documentElement.setAttribute('data-theme', stored);
  else if(window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) document.documentElement.setAttribute('data-theme','light');

  function updateThemeButton(){
    const t = document.documentElement.getAttribute('data-theme');
    themeToggle.textContent = t === 'light' ? '🌙' : '☀️';
  }
  updateThemeButton();

  themeToggle.addEventListener('click', ()=>{
    const cur = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', cur);
    localStorage.setItem('theme', cur);
    updateThemeButton();
  });

  // Mobile nav
  navToggle.addEventListener('click', ()=> nav.classList.toggle('open'));

  // Smooth scroll for nav links
  document.querySelectorAll('.nav a').forEach(a=>{
    a.addEventListener('click', (e)=>{
      e.preventDefault();
      const id = a.getAttribute('href');
      document.querySelector(id).scrollIntoView({behavior:'smooth'});
      if(nav.classList.contains('open')) nav.classList.remove('open');
    });
  });

  // Skills reveal
  const skills = document.querySelectorAll('.skill-card');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting) entry.target.style.transform = 'translateY(0)';
    });
  },{threshold:0.15});
  skills.forEach((s,i)=>{ s.style.transform = 'translateY(16px)'; s.style.opacity = 1; s.style.transition = 'transform .6s cubic-bezier(.2,.9,.2,1)'; io.observe(s)});

  // Contact form handling (fake send)
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    status.textContent = 'Sending...';
    const data = new FormData(form);
    // Basic validation
    if(!data.get('name') || !data.get('email') || !data.get('message')){
      status.textContent = 'Please fill all fields.'; return;
    }
    setTimeout(()=>{
      status.textContent = 'Thanks! I’ll get back to you soon.';
      form.reset();
    },900);
  });

  // tiny accessibility: focus outlines for keyboard users
  document.addEventListener('keydown', (e)=>{ if(e.key === 'Tab') document.body.classList.add('show-focus') });
})();
