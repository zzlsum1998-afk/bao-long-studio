    const heroResumeImages = [
      "images/resume-previews/resume-1.webp",
      "images/resume-previews/resume-2.webp",
      "images/resume-previews/resume-3.webp",
      "images/resume-previews/resume-4.webp"
    ];

    function switchHeroTemplate(index){
      const sheet = document.getElementById("heroSheet");
      const thumbs = document.querySelectorAll(".thumb");
      thumbs.forEach((thumb, i) => thumb.classList.toggle("active", i === index));
      if(sheet && heroResumeImages[index]){
        sheet.src = heroResumeImages[index];
        sheet.alt = `Resume template preview ${String(index + 1).padStart(2, "0")}`;
      }
    }
  

function handleResumeUploadPlaceholder(input){
  const file = input.files && input.files[0];
  const status = document.getElementById("resumeUploadStatus");
  if(!file){
    if(status) status.textContent = "No file selected.";
    return;
  }
  const lowerName = file.name.toLowerCase();
  const okByExt = [".jpeg",".jpg",".png",".pdf",".doc",".docx"].some(ext => lowerName.endsWith(ext));
  if(!okByExt){
    alert("文件识别功能正在准备中，请先使用可编辑表单填写简历内容。");
    input.value = "";
    if(status) status.textContent = "Unsupported file type.";
    return;
  }
  if(status) status.textContent = "已选择：" + file.name + "（识别功能准备中）";
}

    function navFilter(category){
      location.href = 'assets.html?filter=' + encodeURIComponent(category) + '#products';
      return false;
    }
  

    function toggleMobileMenu(){
      const panel = document.getElementById('mobileMenuPanel');
      if(panel) panel.classList.toggle('open');
    }

    function closeMobileMenu(){
      const panel = document.getElementById('mobileMenuPanel');
      if(panel) panel.classList.remove('open');
    }

    document.addEventListener('click', function(event){
      const panel = document.getElementById('mobileMenuPanel');
      const toggle = document.querySelector('.mobile-menu-toggle');
      if(!panel || !toggle) return;
      if(panel.contains(event.target) || toggle.contains(event.target)) return;
      panel.classList.remove('open');
    });

// v321 · resume.html static event attribute migration
function initResumePageEvents(){
  document.querySelectorAll('[data-nav-filter]').forEach((link) => {
    link.addEventListener('click', function(event){
      event.preventDefault();
      navFilter(link.dataset.navFilter);
    });
  });

  const loginEntry = document.querySelector('[data-resume-login-entry]');
  if(loginEntry){
    loginEntry.addEventListener('click', function(){
      location.href = 'login.html';
    });
  }

  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  if(mobileToggle){
    mobileToggle.addEventListener('click', toggleMobileMenu);
  }

  document.querySelectorAll('#mobileMenuPanel a').forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });

  document.querySelectorAll('[data-hero-template-index]').forEach((button) => {
    button.addEventListener('click', function(){
      switchHeroTemplate(Number(button.dataset.heroTemplateIndex));
    });
  });

  const uploadInput = document.querySelector('.resume-upload-file');
  if(uploadInput){
    uploadInput.addEventListener('change', function(event){
      handleResumeUploadPlaceholder(event.currentTarget);
    });
  }

  const viewTemplatesButton = document.getElementById('resumeViewTemplatesButton');
  if(viewTemplatesButton){
    viewTemplatesButton.addEventListener('click', function(){
      const templates = document.getElementById('templates');
      if(templates) templates.scrollIntoView({behavior: 'smooth'});
    });
  }
}

initResumePageEvents();
