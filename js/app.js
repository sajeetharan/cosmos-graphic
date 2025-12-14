// ===================================
// Global State
// ===================================
let contentData = null;
let currentSectionData = null;
let currentZoom = 1;
let isDragging = false;
let startX = 0;
let startY = 0;
let scrollLeft = 0;
let scrollTop = 0;

// ===================================
// Initialize Application
// ===================================
document.addEventListener('DOMContentLoaded', async () => {
    await loadContent();
    renderSidebarNavigation();
    renderNavigation();
    renderContent();
    setupEventListeners();
    setupImageProtection();
    updateProgressBar();
    setupSidebar();
    setupMobileCollapsible();
});

// ===================================
// Load Content Data
// ===================================
async function loadContent() {
    try {
        const response = await fetch('data/content.json');
        contentData = await response.json();
    } catch (error) {
        console.error('Error loading content:', error);
        contentData = { chapters: [] };
    }
}

// ===================================
// Render Navigation
// ===================================
function renderSidebarNavigation() {
    const sidebarNav = document.getElementById('sidebarNav');
    if (!sidebarNav) return;
    
    contentData.chapters.forEach((chapter, index) => {
        const chapterDiv = document.createElement('div');
        chapterDiv.className = 'sidebar-chapter';
        
        const headerButton = document.createElement('button');
        headerButton.className = 'sidebar-chapter-header';
        headerButton.innerHTML = `
            <span class="sidebar-chapter-icon">${chapter.icon}</span>
            <span class="sidebar-chapter-title">${chapter.title}</span>
            <svg class="sidebar-chapter-toggle" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M6 9l6 6 6-6"/>
            </svg>
        `;
        
        headerButton.addEventListener('click', () => {
            chapterDiv.classList.toggle('collapsed');
        });
        
        const sectionsDiv = document.createElement('div');
        sectionsDiv.className = 'sidebar-sections';
        
        chapter.sections.forEach(section => {
            const link = document.createElement('a');
            link.href = `#${section.id}`;
            link.className = 'sidebar-section';
            link.textContent = section.title;
            link.addEventListener('click', (e) => {
                e.preventDefault();
                scrollToSection(section.id);
                closeSidebar();
                
                // Update active state
                document.querySelectorAll('.sidebar-section').forEach(s => s.classList.remove('active'));
                link.classList.add('active');
            });
            sectionsDiv.appendChild(link);
        });
        
        chapterDiv.appendChild(headerButton);
        chapterDiv.appendChild(sectionsDiv);
        sidebarNav.appendChild(chapterDiv);
    });
}

function renderNavigation() {
    const navChapters = document.getElementById('navChapters');
    if (!navChapters) return;
    
    contentData.chapters.forEach((chapter, index) => {
        const chip = document.createElement('a');
        chip.href = `#chapter-${chapter.id}`;
        chip.className = 'nav-chip';
        chip.innerHTML = `${chapter.icon} ${chapter.title}`;
        chip.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToChapter(chapter.id);
        });
        navChapters.appendChild(chip);
    });
}

// ===================================
// Render Main Content
// ===================================
function renderContent() {
    const mainContent = document.getElementById('mainContent');
    const contentWrapper = mainContent.querySelector('.content-wrapper') || mainContent;
    
    contentData.chapters.forEach(chapter => {
        const chapterElement = createChapterElement(chapter);
        contentWrapper.appendChild(chapterElement);
    });
}

function createChapterElement(chapter) {
    const chapterDiv = document.createElement('div');
    chapterDiv.className = 'chapter';
    chapterDiv.id = `chapter-${chapter.id}`;
    
    chapterDiv.innerHTML = `
        <div class="chapter-header" style="border-color: ${chapter.color}">
            <div class="chapter-icon">${chapter.icon}</div>
            <h2 class="chapter-title">${chapter.title}</h2>
        </div>
        <div class="chapter-sections"></div>
    `;
    
    const sectionsContainer = chapterDiv.querySelector('.chapter-sections');
    chapter.sections.forEach(section => {
        const sectionElement = createSectionElement(section, chapter.color);
        sectionsContainer.appendChild(sectionElement);
    });
    
    return chapterDiv;
}

function createSectionElement(section, color) {
    const sectionDiv = document.createElement('div');
    sectionDiv.className = 'section-card';
    sectionDiv.id = section.id;
    sectionDiv.onclick = () => openModal(section);
    
    sectionDiv.innerHTML = `
        <div class="section-image">
            <canvas class="section-canvas" data-image="${section.image}"></canvas>
            <div class="image-watermark">Azure Cosmos DB Learning</div>
            <div class="image-overlay">
                <p class="overlay-text">Click to view full details and expand image</p>
            </div>
        </div>
        <div class="section-content">
            <h3 class="section-title">${section.title}</h3>
            <p class="section-description">${section.description}</p>
            <div class="key-points">
                <h4>Key Points</h4>
                <ul>
                    ${section.keyPoints.map(point => `<li>${point}</li>`).join('')}
                </ul>
            </div>
            <a href="${section.learnMoreUrl}" target="_blank" class="learn-more-link" onclick="event.stopPropagation()">
                Learn More
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
                </svg>
            </a>
        </div>
    `;
    
    // Load image into canvas after element is created
    setTimeout(() => {
        const canvas = sectionDiv.querySelector('.section-canvas');
        loadImageToCanvas(canvas, section.image);
    }, 100);
    
    return sectionDiv;
}

// ===================================
// Canvas Image Loading & Protection
// ===================================
function loadImageToCanvas(canvas, imagePath) {
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        // Add semi-transparent watermark overlay
        ctx.globalAlpha = 0.08;
        ctx.font = 'bold 48px Arial';
        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'center';
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(-45 * Math.PI / 180);
        ctx.fillText('AZURE COSMOS DB', 0, 0);
        ctx.globalAlpha = 1.0;
    };
    
    img.onerror = function() {
        console.error('Failed to load image:', imagePath);
        ctx.fillStyle = '#1A1A2E';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Image not found', canvas.width / 2, canvas.height / 2);
    };
    
    img.src = imagePath;
}

// ===================================
// Modal Functionality
// ===================================
function openModal(section) {
    currentSectionData = section;
    const modal = document.getElementById('imageModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalKeyPoints = document.getElementById('modalKeyPoints');
    const modalLearnMore = document.getElementById('modalLearnMore');
    const canvas = document.getElementById('imageCanvas');
    
    modalTitle.textContent = section.title;
    modalDescription.textContent = section.description;
    modalLearnMore.href = section.learnMoreUrl;
    
    // Render key points
    modalKeyPoints.innerHTML = `
        <h4>Key Points</h4>
        <ul>
            ${section.keyPoints.map(point => `<li>${point}</li>`).join('')}
        </ul>
    `;
    
    // Load image to modal canvas
    loadImageToCanvas(canvas, section.image);
    
    // Reset zoom
    currentZoom = 1;
    updateZoomLevel();
    
    // Setup zoom and pan listeners
    setupZoomListeners();
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    currentSectionData = null;
    
    // Reset zoom
    currentZoom = 1;
    const canvas = document.getElementById('imageCanvas');
    if (canvas) {
        canvas.style.transform = 'scale(1)';
    }
    
    // Clean up listeners
    const container = document.getElementById('imageContainer');
    if (container) {
        container.removeEventListener('wheel', handleWheel);
        container.removeEventListener('mousedown', handleMouseDown);
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseup', handleMouseUp);
        container.removeEventListener('mouseleave', handleMouseUp);
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', handleTouchMove);
        container.removeEventListener('touchend', handleTouchEnd);
    }
}

// ===================================
// Image Protection
// ===================================
function setupImageProtection() {
    // Disable right-click on all canvases
    document.addEventListener('contextmenu', (e) => {
        if (e.target.tagName === 'CANVAS') {
            e.preventDefault();
            showProtectionNotice();
            return false;
        }
    });
    
    // Disable drag on canvases
    document.addEventListener('dragstart', (e) => {
        if (e.target.tagName === 'CANVAS') {
            e.preventDefault();
            return false;
        }
    });
    
    // Disable selection on image containers
    const imageContainers = document.querySelectorAll('.section-image, .modal-image-container');
    imageContainers.forEach(container => {
        container.style.userSelect = 'none';
        container.style.webkitUserSelect = 'none';
        container.style.mozUserSelect = 'none';
        container.style.msUserSelect = 'none';
    });
    
    // Prevent canvas inspection (basic protection)
    document.addEventListener('keydown', (e) => {
        // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
        if (
            e.key === 'F12' ||
            (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
            (e.ctrlKey && e.key === 'U')
        ) {
            if (document.activeElement.closest('.section-image, .modal-image-container')) {
                e.preventDefault();
                showProtectionNotice();
                return false;
            }
        }
        
        // Disable Ctrl+S (Save)
        if (e.ctrlKey && e.key === 's') {
            if (document.activeElement.closest('.section-image, .modal-image-container')) {
                e.preventDefault();
                showProtectionNotice();
                return false;
            }
        }
    });
}

function showProtectionNotice() {
    // Create a temporary notification
    const notice = document.createElement('div');
    notice.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #0078D4 0%, #50E6FF 100%);
        color: white;
        padding: 1.5rem 2rem;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        font-family: 'Poppins', sans-serif;
        font-weight: 600;
        text-align: center;
        animation: slideIn 0.3s ease;
    `;
    notice.innerHTML = `
        <div style="font-size: 2rem; margin-bottom: 0.5rem;">🔒</div>
        <div>These images are protected for educational purposes</div>
        <div style="font-size: 0.875rem; margin-top: 0.5rem; opacity: 0.9;">Visit Microsoft Learn for official documentation</div>
    `;
    
    document.body.appendChild(notice);
    
    setTimeout(() => {
        notice.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notice.remove(), 300);
    }, 2500);
}

// Add CSS for notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translate(-50%, -60%);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%);
        }
    }
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translate(-50%, -50%);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -40%);
        }
    }
`;
document.head.appendChild(style);

// ===================================
// Navigation & Scroll
// ===================================
function scrollToChapter(chapterId) {
    const chapter = document.getElementById(`chapter-${chapterId}`);
    if (chapter) {
        const navHeight = document.querySelector('.sticky-nav').offsetHeight;
        const targetPosition = chapter.offsetTop - navHeight - 20;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

function scrollToContent() {
    const mainContent = document.getElementById('mainContent');
    if (mainContent) {
        const navHeight = document.querySelector('.sticky-nav').offsetHeight;
        const targetPosition = mainContent.offsetTop - navHeight;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

function scrollToSection(sectionId) {
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
        const offset = 100;
        const targetPosition = sectionElement.offsetTop - offset;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Highlight the section briefly
        sectionElement.style.boxShadow = '0 0 0 3px var(--primary-color)';
        setTimeout(() => {
            sectionElement.style.boxShadow = '';
        }, 1500);
    }
}

// ===================================
// Progress Bar
// ===================================
function updateProgressBar() {
    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        const progress = (scrolled / documentHeight) * 100;
        
        document.getElementById('progressBar').style.width = `${progress}%`;
        
        // Update active navigation chip
        updateActiveNavChip();
    });
}

function updateActiveNavChip() {
    const chapters = document.querySelectorAll('.chapter');
    const navChips = document.querySelectorAll('.nav-chip');
    const navHeight = document.querySelector('.sticky-nav').offsetHeight;
    
    let currentChapterIndex = 0;
    
    chapters.forEach((chapter, index) => {
        const rect = chapter.getBoundingClientRect();
        if (rect.top <= navHeight + 100) {
            currentChapterIndex = index;
        }
    });
    
    navChips.forEach((chip, index) => {
        if (index === currentChapterIndex) {
            chip.classList.add('active');
        } else {
            chip.classList.remove('active');
        }
    });
}

// ===================================
// Event Listeners
// ===================================
function setupEventListeners() {
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        },
        { threshold: 0.1 }
    );
    
    // Observe all section cards
    setTimeout(() => {
        document.querySelectorAll('.section-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }, 500);
}

// ===================================
// Utility Functions
// ===================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===================================
// Analytics & Tracking (Optional)
// ===================================
function trackImageView(sectionTitle) {
    // Placeholder for analytics tracking
    console.log('Image viewed:', sectionTitle);
}

function trackLearnMoreClick(url) {
    // Placeholder for analytics tracking
    console.log('Learn more clicked:', url);
}

// ===================================
// Error Handling
// ===================================
window.addEventListener('error', (e) => {
    console.error('Application error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

// ===================================
// Zoom Functionality
// ===================================
function zoomIn() {
    currentZoom = Math.min(currentZoom + 0.25, 4);
    applyZoom();
}

function zoomOut() {
    currentZoom = Math.max(currentZoom - 0.25, 0.5);
    applyZoom();
}

function resetZoom() {
    currentZoom = 1;
    applyZoom();
    
    // Reset scroll position
    const container = document.getElementById('imageContainer');
    if (container) {
        container.scrollLeft = 0;
        container.scrollTop = 0;
    }
}

function applyZoom() {
    const canvas = document.getElementById('imageCanvas');
    if (canvas) {
        canvas.style.transform = `scale(${currentZoom})`;
        updateZoomLevel();
    }
}

function updateZoomLevel() {
    const zoomLevelEl = document.getElementById('zoomLevel');
    if (zoomLevelEl) {
        zoomLevelEl.textContent = `${Math.round(currentZoom * 100)}%`;
    }
}

function setupZoomListeners() {
    const container = document.getElementById('imageContainer');
    if (!container) return;
    
    // Mouse wheel zoom
    container.addEventListener('wheel', handleWheel, { passive: false });
    
    // Pan with mouse drag
    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mouseleave', handleMouseUp);
    
    // Touch gestures
    let touchStartDistance = 0;
    let initialZoom = 1;
    
    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd);
}

function handleWheel(e) {
    e.preventDefault();
    
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    currentZoom = Math.max(0.5, Math.min(4, currentZoom + delta));
    applyZoom();
}

function handleMouseDown(e) {
    if (e.target.closest('.zoom-controls')) return;
    
    isDragging = true;
    const container = document.getElementById('imageContainer');
    container.classList.add('dragging');
    
    startX = e.pageX - container.offsetLeft;
    startY = e.pageY - container.offsetTop;
    scrollLeft = container.scrollLeft;
    scrollTop = container.scrollTop;
}

function handleMouseMove(e) {
    if (!isDragging) return;
    e.preventDefault();
    
    const container = document.getElementById('imageContainer');
    const x = e.pageX - container.offsetLeft;
    const y = e.pageY - container.offsetTop;
    const walkX = (x - startX) * 1.5;
    const walkY = (y - startY) * 1.5;
    
    container.scrollLeft = scrollLeft - walkX;
    container.scrollTop = scrollTop - walkY;
}

function handleMouseUp() {
    isDragging = false;
    const container = document.getElementById('imageContainer');
    if (container) {
        container.classList.remove('dragging');
    }
}

let touchStartDistance = 0;
let initialZoom = 1;
let touchStartPos = { x: 0, y: 0 };

function handleTouchStart(e) {
    if (e.touches.length === 2) {
        // Pinch zoom
        e.preventDefault();
        touchStartDistance = getTouchDistance(e.touches);
        initialZoom = currentZoom;
    } else if (e.touches.length === 1) {
        // Pan
        const container = document.getElementById('imageContainer');
        touchStartPos = {
            x: e.touches[0].pageX,
            y: e.touches[0].pageY
        };
        scrollLeft = container.scrollLeft;
        scrollTop = container.scrollTop;
    }
}

function handleTouchMove(e) {
    if (e.touches.length === 2) {
        // Pinch zoom
        e.preventDefault();
        const currentDistance = getTouchDistance(e.touches);
        const scale = currentDistance / touchStartDistance;
        currentZoom = Math.max(0.5, Math.min(4, initialZoom * scale));
        applyZoom();
    } else if (e.touches.length === 1 && currentZoom > 1) {
        // Pan when zoomed
        e.preventDefault();
        const container = document.getElementById('imageContainer');
        const deltaX = touchStartPos.x - e.touches[0].pageX;
        const deltaY = touchStartPos.y - e.touches[0].pageY;
        
        container.scrollLeft = scrollLeft + deltaX;
        container.scrollTop = scrollTop + deltaY;
    }
}

function handleTouchEnd(e) {
    if (e.touches.length < 2) {
        touchStartDistance = 0;
    }
}

function getTouchDistance(touches) {
    const dx = touches[0].pageX - touches[1].pageX;
    const dy = touches[0].pageY - touches[1].pageY;
    return Math.sqrt(dx * dx + dy * dy);
}

// ===================================
// Sidebar Functions
// ===================================
function setupSidebar() {
    const menuToggle = document.getElementById('menuToggle');
    const sidebarClose = document.getElementById('sidebarClose');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const sidebar = document.getElementById('sidebar');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', openSidebar);
    }
    
    if (sidebarClose) {
        sidebarClose.addEventListener('click', closeSidebar);
    }
    
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeSidebar);
    }
    
    // Update active section on scroll
    window.addEventListener('scroll', updateActiveSidebarSection);
}

function openSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    if (sidebar) sidebar.classList.add('open');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
}

function updateActiveSidebarSection() {
    const sections = document.querySelectorAll('.section-card');
    const sidebarLinks = document.querySelectorAll('.sidebar-section');
    
    let currentSection = null;
    const scrollPosition = window.scrollY + 200;
    
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            currentSection = section.querySelector('.section-canvas')?.dataset.image;
        }
    });
    
    if (currentSection) {
        sidebarLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentSection)) {
                link.classList.add('active');
            }
        });
    }
}

// ===================================
// Console Warning
// ===================================
console.log(
    '%c⚠️ Image Protection Active',
    'font-size: 20px; font-weight: bold; color: #0078D4;'
);
console.log(
    '%cThese images are protected and intended for educational purposes only.',
    'font-size: 14px; color: #50E6FF;'
);
console.log(
    '%cFor official documentation, visit: https://learn.microsoft.com/azure/cosmos-db/',
    'font-size: 12px; color: #B8B8D1;'
);

// ===================================
// Mobile Collapsible Content
// ===================================
function setupMobileCollapsible() {
    const isMobile = () => window.innerWidth <= 768;
    
    function updateCardStates() {
        const sectionCards = document.querySelectorAll('.section-card');
        
        if (isMobile()) {
            sectionCards.forEach(card => {
                // Set collapsed state by default on mobile
                if (!card.classList.contains('mobile-expanded')) {
                    card.classList.add('mobile-collapsed');
                }
                
                // Remove the modal click and add toggle behavior
                card.onclick = (e) => {
                    e.stopPropagation();
                    
                    // Toggle this card
                    if (card.classList.contains('mobile-collapsed')) {
                        card.classList.remove('mobile-collapsed');
                        card.classList.add('mobile-expanded');
                    } else {
                        card.classList.remove('mobile-expanded');
                        card.classList.add('mobile-collapsed');
                    }
                };
            });
        } else {
            // Desktop: remove mobile classes and restore modal behavior
            sectionCards.forEach((card, index) => {
                card.classList.remove('mobile-collapsed', 'mobile-expanded');
                
                // Restore modal functionality
                const sectionId = card.id;
                const section = findSectionById(sectionId);
                if (section) {
                    card.onclick = () => openModal(section);
                }
            });
        }
    }
    
    function findSectionById(sectionId) {
        for (const chapter of contentData.chapters) {
            const section = chapter.sections.find(s => s.id === sectionId);
            if (section) return section;
        }
        return null;
    }
    
    // Initial setup
    updateCardStates();
    
    // Update on resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(updateCardStates, 250);
    });
}

// ===================================
// Export for potential module use
// ===================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        loadContent,
        openModal,
        closeModal,
        scrollToChapter
    };
}
