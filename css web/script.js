document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const world = document.getElementById("world")
    const sections = document.querySelectorAll(".section")
    const navButtons = document.querySelectorAll(".nav-btn")
    const shapes = document.querySelectorAll(".shape")
    const propertyDetails = document.getElementById("property-details")
  
    // Control buttons
    const rotateLeft = document.getElementById("rotate-left")
    const rotateRight = document.getElementById("rotate-right")
    const rotateUp = document.getElementById("rotate-up")
    const rotateDown = document.getElementById("rotate-down")
    const zoomIn = document.getElementById("zoom-in")
    const zoomOut = document.getElementById("zoom-out")
    const resetView = document.getElementById("reset-view")
  
    // World transformation state
    let worldTransform = {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      translateZ: 0,
    }
  
    // Mouse position tracking for parallax effect
    let mouseX = 0
    let mouseY = 0
  
    // Update world transform
    function updateWorldTransform() {
      world.style.transform = `
              rotateX(${worldTransform.rotateX}deg) 
              rotateY(${worldTransform.rotateY}deg) 
              scale(${worldTransform.scale}) 
              translateZ(${worldTransform.translateZ}px)
          `
    }
  
    // Navigation between sections
    navButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const sectionId = button.getAttribute("data-section")
  
        // Update active button
        navButtons.forEach((btn) => btn.classList.remove("active"))
        button.classList.add("active")
  
        // Update active section
        sections.forEach((section) => {
          section.classList.remove("active")
          if (section.id === sectionId) {
            section.classList.add("active")
          }
        })
  
        // Reset view when changing sections
        resetWorldTransform()
      })
    })
  
    // Control button event listeners
    rotateLeft.addEventListener("click", () => {
      worldTransform.rotateY -= 15
      updateWorldTransform()
    })
  
    rotateRight.addEventListener("click", () => {
      worldTransform.rotateY += 15
      updateWorldTransform()
    })
  
    rotateUp.addEventListener("click", () => {
      worldTransform.rotateX -= 15
      updateWorldTransform()
    })
  
    rotateDown.addEventListener("click", () => {
      worldTransform.rotateX += 15
      updateWorldTransform()
    })
  
    zoomIn.addEventListener("click", () => {
      worldTransform.scale += 0.1
      updateWorldTransform()
    })
  
    zoomOut.addEventListener("click", () => {
      worldTransform.scale = Math.max(0.5, worldTransform.scale - 0.1)
      updateWorldTransform()
    })
  
    resetView.addEventListener("click", resetWorldTransform)
  
    function resetWorldTransform() {
      worldTransform = {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        translateZ: 0,
      }
      updateWorldTransform()
    }
  
    // Mouse move parallax effect
    document.addEventListener("mousemove", (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 20
      mouseY = (e.clientY / window.innerHeight - 0.5) * 20
  
      // Subtle parallax effect
      if (!isDragging) {
        world.style.transform = `
                  rotateX(${worldTransform.rotateX - mouseY * 0.5}deg) 
                  rotateY(${worldTransform.rotateY + mouseX * 0.5}deg) 
                  scale(${worldTransform.scale}) 
                  translateZ(${worldTransform.translateZ}px)
              `
      }
    })
  
    // Shape hover effects with property information
    shapes.forEach((shape) => {
      shape.addEventListener("mouseenter", () => {
        let propertyInfo = ""
  
        // Get the code snippet text
        const codeSnippet = shape.querySelector("pre").textContent
  
        // Determine which property to explain based on the section and shape
        if (shape.parentElement.id === "gradients") {
          if (shape.classList.contains("shape-1")) {
            propertyInfo = `<h3>Linear Gradient</h3>
                      <p>Creates a gradient along a straight line. The direction can be specified in degrees or using keywords.</p>
                      <p><strong>Example:</strong> ${codeSnippet}</p>
                      <p>This creates a diagonal gradient from coral to teal.</p>`
          } else if (shape.classList.contains("shape-2")) {
            propertyInfo = `<h3>Radial Gradient</h3>
                      <p>Creates a gradient that radiates from a central point. Can be circular or elliptical.</p>
                      <p><strong>Example:</strong> ${codeSnippet}</p>
                      <p>This creates a circular gradient from gold in the center to coral at the edges.</p>`
          } else if (shape.classList.contains("shape-3")) {
            propertyInfo = `<h3>Conic Gradient</h3>
                      <p>Creates a gradient that rotates around a center point (like a color wheel).</p>
                      <p><strong>Example:</strong> ${codeSnippet}</p>
                      <p>This creates a conic gradient rotating through teal, coral, and gold.</p>`
          }
        } else if (shape.parentElement.id === "shadows") {
          if (shape.classList.contains("shadow-shape-1")) {
            propertyInfo = `<h3>Box Shadow</h3>
                      <p>Adds shadow effects around an element's frame. You can set x-offset, y-offset, blur radius, spread radius, and color.</p>
                      <p><strong>Example:</strong> ${codeSnippet}</p>
                      <p>This creates a shadow 10px to the right, 10px down, with 30px of blur and 50% opacity black.</p>`
          } else if (shape.classList.contains("shadow-shape-2")) {
            propertyInfo = `<h3>Text Shadow</h3>
                      <p>Adds shadow to text. Parameters include x-offset, y-offset, blur radius, and color.</p>
                      <p><strong>Example:</strong> ${codeSnippet}</p>
                      <p>This adds a teal shadow 2px to the right, 2px down, with 8px of blur.</p>`
          } else if (shape.classList.contains("shadow-shape-3")) {
            propertyInfo = `<h3>Drop Shadow Filter</h3>
                      <p>Similar to box-shadow but works with non-rectangular shapes and respects transparency.</p>
                      <p><strong>Example:</strong> ${codeSnippet}</p>
                      <p>This adds a coral shadow with 15px of blur and 70% opacity.</p>`
          }
        } else if (shape.parentElement.id === "transforms") {
          if (shape.classList.contains("transform-shape-1")) {
            propertyInfo = `<h3>3D Rotation</h3>
                      <p>Rotates an element in 3D space around the x, y, and z axes.</p>
                      <p><strong>Example:</strong> ${codeSnippet}</p>
                      <p>This rotates the element 45 degrees around a diagonal axis (1,1,1).</p>`
          } else if (shape.classList.contains("transform-shape-2")) {
            propertyInfo = `<h3>3D Scaling</h3>
                      <p>Scales an element differently along each axis in 3D space.</p>
                      <p><strong>Example:</strong> ${codeSnippet}</p>
                      <p>This scales the element 1.5x horizontally, 0.8x vertically, while keeping the z-scale at 1.</p>`
          } else if (shape.classList.contains("transform-shape-3")) {
            propertyInfo = `<h3>3D Translation</h3>
                      <p>Moves an element in 3D space along the x, y, and z axes.</p>
                      <p><strong>Example:</strong> ${codeSnippet}</p>
                      <p>This moves the element 20px right, 30px up, and 50px forward in 3D space.</p>`
          }
        } else if (shape.parentElement.id === "animations") {
          if (shape.classList.contains("animation-shape-1")) {
            propertyInfo = `<h3>Float Animation</h3>
                      <p>Creates a gentle floating effect using keyframes.</p>
                      <p><strong>Example:</strong> ${codeSnippet}</p>
                      <p>This animation repeats infinitely with a smooth ease-in-out timing function over 3 seconds.</p>`
          } else if (shape.classList.contains("animation-shape-2")) {
            propertyInfo = `<h3>Pulse Animation</h3>
                      <p>Creates a pulsing effect that changes the size of an element.</p>
                      <p><strong>Example:</strong> ${codeSnippet}</p>
                      <p>This animation uses a custom cubic-bezier timing function for a more organic feel.</p>`
          } else if (shape.classList.contains("animation-shape-3")) {
            propertyInfo = `<h3>Spin Animation</h3>
                      <p>Rotates an element continuously in 3D space.</p>
                      <p><strong>Example:</strong> ${codeSnippet}</p>
                      <p>This creates a constant rotation at a steady pace using the linear timing function.</p>`
          }
        }
  
        propertyDetails.innerHTML = propertyInfo
      })
    })
  
    // Create background particles
    createParticles()
  
    function createParticles() {
      const environment = document.querySelector(".environment")
      const particleCount = 30
  
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div")
        particle.classList.add("particle")
  
        // Random size between 2-8px
        const size = Math.random() * 6 + 2
        particle.style.width = `${size}px`
        particle.style.height = `${size}px`
  
        // Random position
        particle.style.left = `${Math.random() * 100}%`
        particle.style.top = `${Math.random() * 100}%`
  
        // Random depth
        particle.style.zIndex = Math.floor(Math.random() * 10) - 20
  
        // Random opacity
        particle.style.opacity = Math.random() * 0.5 + 0.1
  
        // Random color
        const colors = ["var(--coral)", "var(--teal)", "var(--gold)", "white"]
        particle.style.background = colors[Math.floor(Math.random() * colors.length)]
  
        // Add animation
        particle.style.animation = `float ${Math.random() * 10 + 10}s ease-in-out infinite`
        particle.style.animationDelay = `${Math.random() * 5}s`
  
        environment.appendChild(particle)
      }
    }
  
    // Dragging functionality
    let isDragging = false
    let previousMousePosition = { x: 0, y: 0 }
  
    document.addEventListener("mousedown", (e) => {
      isDragging = true
      previousMousePosition = { x: e.clientX, y: e.clientY }
    })
  
    document.addEventListener("mouseup", () => {
      isDragging = false
    })
  
    document.addEventListener("mouseleave", () => {
      isDragging = false
    })
  
    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return
  
      const deltaX = e.clientX - previousMousePosition.x
      const deltaY = e.clientY - previousMousePosition.y
  
      worldTransform.rotateY += deltaX * 0.5
      worldTransform.rotateX -= deltaY * 0.5
  
      updateWorldTransform()
  
      previousMousePosition = { x: e.clientX, y: e.clientY }
    })
  
    // Touch events for mobile
    document.addEventListener("touchstart", (e) => {
      if (e.touches.length === 1) {
        isDragging = true
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      }
    })
  
    document.addEventListener("touchend", () => {
      isDragging = false
    })
  
    document.addEventListener(
      "touchmove",
      (e) => {
        if (!isDragging || e.touches.length !== 1) return
  
        const deltaX = e.touches[0].clientX - previousMousePosition.x
        const deltaY = e.touches[0].clientY - previousMousePosition.y
  
        worldTransform.rotateY += deltaX * 0.5
        worldTransform.rotateX -= deltaY * 0.5
  
        updateWorldTransform()
  
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  
        // Prevent scrolling when interacting with the 3D environment
        e.preventDefault()
      },
      { passive: false },
    )
  
    // Handle window resize
    window.addEventListener("resize", () => {
      // Adjust any size-dependent variables here if needed
    })
  
    // Initialize the view
    updateWorldTransform()
  })
  
  