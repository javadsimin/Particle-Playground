# Particle Playground – My First Google Antigravity Web App

Check it here: https://javadsimin.github.io/Particle-Playground

This is the **first ever web app** I’ve created using **Google Antigravity**.  
It took about **5 minutes** from idea to running app, mainly as a test to see how the tool works and what kind of code it generates.

The result is a simple but fun **mouse-interactive particle playground** that runs entirely in the browser.

---

## 💡 What the App Does

- Shows a fullscreen canvas with glowing particles  
- Particles move and react to your mouse position  
- Creates smooth, relaxing visual effects in real time  
- Built with **HTML + CSS + JavaScript (Canvas)**

It’s not meant to be a serious product – just an experiment, a proof of concept, and a memory of my **first AI-assisted web app build**.

---

## 🚀 How to Run

1. Clone or download this repository.
2. Open `index.html` in a modern browser (Chrome, Edge, Firefox, etc.).
3. Move your mouse around the screen and watch the particles react.

No build step, no dependencies, no backend – just open and play.

---

## 🧪 Why This Exists

- To test **Google Antigravity** and see how it handles a full small project.
- To have a minimal example of an **AI-generated frontend app**.
- To mark the moment I created my **first web app** with these tools.

---

## 🔮 Next Ideas

- Add UI controls to tweak number of particles, colors, and effects  
- Add a “gravity / antigravity” toggle  
- Add mobile / touch support

---

## 🧰 Google Antigravity Prompt Used to Generate This App

Below is the exact prompt I used inside Google Antigravity to generate the entire application in a few minutes:

---

**Prompt:**  
Create a complete, production-ready web app called **Particle Playground**.  
It must run fully in the browser using **HTML + CSS + JavaScript (Canvas)** with no backend.

### **App Description**
A fullscreen interactive canvas where the mouse controls glowing particles.

### **Required Features**
1. **Mouse Tracking:**  
   Particles follow the mouse smoothly.

2. **Particle System:**  
   - 300–1000 particles  
   - Soft glow effect  
   - Randomized initial positions  
   - Smooth movement interpolation (lerp)

3. **Particle Behaviors:**  
   - **Particle trail** behind the mouse  
   - **Color changes** based on mouse speed  
   - **Repel effect:** particles move away if mouse gets too close  
   - **Orbit effect:** particles lightly orbit the cursor when nearby  
   - Smooth easing animations

4. **Performance Requirements:**  
   - 60 FPS animation loop  
   - Efficient canvas rendering  
   - Automatically resize canvas on window resize  
   - GPU-friendly composite operations

5. **UI Requirements:**  
   Add a small, minimal floating UI panel (top-right):  
   - Toggle trail ON/OFF  
   - Toggle repel ON/OFF  
   - Toggle orbit ON/OFF  
   - Slider: particle count (100–1500)  
   - Dark mode toggle  
   - UI must be minimal and not block the canvas.

6. **Visual Style:**  
   - Black or deep gradient background  
   - Neon-style particles  
   - Additive blending glow  
   - Rounded particle shapes  
   - Smooth fade-out trails

7. **Code Requirements:**  
   - Pure JavaScript (no external libraries)  
   - Use classes for particles  
   - Use `requestAnimationFrame`  
   - Clean and modular code  
   - Add comments for clarity

### **Output Format**
Produce a full project with:  
- `index.html`  
- `style.css`  
- `script.js`  

All code must be ready to run immediately.

---

Thanks for checking it out! 😊
