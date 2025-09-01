"use client"

import { useState, useEffect, useRef } from "react"
import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  User,
  Mail,
  Battery,
  Clock,
  ExternalLink,
  X,
} from "lucide-react"

export default function Portfolio() {
  const [currentSection, setCurrentSection] = useState(0)
  const [currentTime, setCurrentTime] = useState("")
  const [showProjects, setShowProjects] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(false)
  const projectsRef = useRef<HTMLDivElement>(null)
  const audioContextRef = useRef<AudioContext | null>(null)

  const [nameText, setNameText] = useState("")
  const [titleText, setTitleText] = useState("")
  const [nameIndex, setNameIndex] = useState(0)
  const [titleIndex, setTitleIndex] = useState(0)
  const [nameIsDeleting, setNameIsDeleting] = useState(false)
  const [titleIsDeleting, setTitleIsDeleting] = useState(false)
  const [showTitle, setShowTitle] = useState(false)

  const nameString = "Raúl De Jesús Vargas Hernández"
  const titleString = "Desarrollador Full Stack"

  const sections = [
    {
      id: "home",
      title: "Sobre Mí",
      bgColor: "bg-black",
      consoleIcon: <User className="w-8 h-8 text-white" />,
      consoleBg: "bg-green-400",
      consoleTitle: "Sobre Mí",
    },
    {
      id: "skills",
      title: "Skills",
      bgColor: "bg-purple-800",
      consoleIcon: (
        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
          <span className="text-white font-bold text-xs">JS</span>
        </div>
      ),
      consoleBg: "bg-blue-500",
      consoleTitle: "Skills",
    },
    {
      id: "project1",
      title: "LinkerPro",
      bgColor: "bg-red-700",
      consoleIcon: (
        <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
          <span className="text-blue-600 font-bold text-xs">LP</span>
        </div>
      ),
      consoleBg: "bg-white",
      consoleTitle: "LinkerPro",
      consoleTitleColor: "text-blue-600",
    },
    {
      id: "project2",
      title: "LinkerStore",
      bgColor: "bg-blue-700",
      consoleIcon: (
        <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
          <span className="text-blue-600 font-bold text-xs">LS</span>
        </div>
      ),
      consoleBg: "bg-white",
      consoleTitle: "LinkerStore",
      consoleTitleColor: "text-blue-600",
    },
    {
      id: "project3",
      title: "Tienda Elizabeth",
      bgColor: "bg-green-700",
      consoleIcon: (
        <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
          <span className="text-green-600 font-bold text-xs">TE</span>
        </div>
      ),
      consoleBg: "bg-white",
      consoleTitle: "Elizabeth",
      consoleTitleColor: "text-green-600",
    },
    {
      id: "contact",
      title: "Contacto",
      bgColor: "bg-gray-900",
      consoleIcon: <Mail className="w-8 h-8 text-white" />,
      consoleBg: "bg-green-400",
      consoleTitle: "Contacto",
    },
  ]

  // Initialize audio context
  const initAudio = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
    setAudioEnabled(true)
  }

  // Create retro sound effects
  const playSound = (type: "hover" | "click" | "push" | "button" | "navigation" | "modal" | "success" | "error") => {
    if (!audioEnabled || !audioContextRef.current) return

    const audioContext = audioContextRef.current
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    // Different sounds for different interactions
    switch (type) {
      case "hover":
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
        oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1)
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
        oscillator.type = "sine"
        break
      case "click":
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime)
        oscillator.frequency.exponentialRampToValueAtTime(300, audioContext.currentTime + 0.2)
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)
        oscillator.type = "square"
        break
      case "push":
        oscillator.frequency.setValueAtTime(400, audioContext.currentTime)
        oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.15)
        gainNode.gain.setValueAtTime(0.15, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15)
        oscillator.type = "triangle"
        break
      case "button":
        // Classic arcade button sound
        oscillator.frequency.setValueAtTime(1000, audioContext.currentTime)
        oscillator.frequency.exponentialRampToValueAtTime(500, audioContext.currentTime + 0.1)
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
        oscillator.type = "square"
        break
      case "navigation":
        // Navigation beep
        oscillator.frequency.setValueAtTime(1200, audioContext.currentTime)
        oscillator.frequency.setValueAtTime(1500, audioContext.currentTime + 0.05)
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
        oscillator.type = "sine"
        break
      case "modal":
        // Modal open/close sound
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
        oscillator.frequency.exponentialRampToValueAtTime(1600, audioContext.currentTime + 0.2)
        gainNode.gain.setValueAtTime(0.25, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)
        oscillator.type = "triangle"
        break
      case "success":
        // Success chime
        oscillator.frequency.setValueAtTime(523, audioContext.currentTime) // C5
        oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.1) // E5
        oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.2) // G5
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
        oscillator.type = "sine"
        break
      case "error":
        // Error buzz
        oscillator.frequency.setValueAtTime(200, audioContext.currentTime)
        oscillator.frequency.setValueAtTime(150, audioContext.currentTime + 0.1)
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)
        oscillator.type = "sawtooth"
        break
    }

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.4)
  }

  // Typewriter effect for name
  useEffect(() => {
    if (currentSection !== 0) return

    const typingSpeed = nameIsDeleting ? 30 : 60
    const pauseTime = nameIsDeleting ? 500 : 1000

    const timer = setTimeout(() => {
      if (!nameIsDeleting && nameIndex < nameString.length) {
        setNameText(nameString.substring(0, nameIndex + 1))
        setNameIndex(nameIndex + 1)
      } else if (nameIsDeleting && nameIndex > 0) {
        setNameText(nameString.substring(0, nameIndex - 1))
        setNameIndex(nameIndex - 1)
      } else if (!nameIsDeleting && nameIndex === nameString.length) {
        setShowTitle(true)
        setTimeout(() => setNameIsDeleting(true), pauseTime)
      } else if (nameIsDeleting && nameIndex === 0) {
        setNameIsDeleting(false)
        setShowTitle(false)
        setTitleText("")
        setTitleIndex(0)
        setTitleIsDeleting(false)
      }
    }, typingSpeed)

    return () => clearTimeout(timer)
  }, [nameIndex, nameIsDeleting, currentSection])

  // Typewriter effect for title
  useEffect(() => {
    if (currentSection !== 0 || !showTitle) return

    const typingSpeed = titleIsDeleting ? 30 : 60
    const pauseTime = titleIsDeleting ? 500 : 1500

    const timer = setTimeout(() => {
      if (!titleIsDeleting && titleIndex < titleString.length) {
        setTitleText(titleString.substring(0, titleIndex + 1))
        setTitleIndex(titleIndex + 1)
      } else if (titleIsDeleting && titleIndex > 0) {
        setTitleText(titleString.substring(0, titleIndex - 1))
        setTitleIndex(titleIndex - 1)
      } else if (!titleIsDeleting && titleIndex === titleString.length) {
        setTimeout(() => setTitleIsDeleting(true), pauseTime)
      } else if (titleIsDeleting && titleIndex === 0) {
        setTitleIsDeleting(false)
      }
    }, typingSpeed)

    return () => clearTimeout(timer)
  }, [titleIndex, titleIsDeleting, showTitle, currentSection])

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        }),
      )
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Matrix-style background animation for home section
    if (currentSection === 0) {
      const matrixContainer = document.getElementById("matrix-bg")
      if (matrixContainer) {
        // Clear existing characters
        matrixContainer.innerHTML = ""

        const characters =
          "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"
        const columns = Math.floor(window.innerWidth / 20)

        for (let i = 0; i < columns; i++) {
          const char = document.createElement("div")
          char.className = "matrix-char"
          char.textContent = characters[Math.floor(Math.random() * characters.length)]
          char.style.left = `${i * 20}px`
          char.style.animationDelay = `${Math.random() * 3}s`
          char.style.animationDuration = `${3 + Math.random() * 2}s`
          matrixContainer.appendChild(char)
        }

        // Add continuous character generation
        const interval = setInterval(() => {
          if (currentSection === 0) {
            const chars = matrixContainer.querySelectorAll(".matrix-char")
            chars.forEach((char) => {
              if (Math.random() > 0.98) {
                char.textContent = characters[Math.floor(Math.random() * characters.length)]
              }
            })
          } else {
            clearInterval(interval)
          }
        }, 100)

        return () => clearInterval(interval)
      }
    }
  }, [currentSection])

  const navigateSection = (direction: "prev" | "next") => {
    playSound("navigation")
    if (direction === "prev") {
      setCurrentSection((prev) => (prev > 0 ? prev - 1 : sections.length - 1))
    } else {
      setCurrentSection((prev) => (prev < sections.length - 1 ? prev + 1 : 0))
    }
  }

  const scrollToProjects = () => {
    playSound("button")
    setShowProjects(true)
    setTimeout(() => {
      projectsRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  const handleContactClick = () => {
    playSound("modal")
    setShowContactModal(true)
  }

  const handleCloseModal = () => {
    playSound("modal")
    setShowContactModal(false)
  }

  const handleEnableAudio = () => {
    initAudio()
    playSound("success")
  }

  const renderCurrentSection = () => {
    const currentSectionData = sections[currentSection]

    switch (currentSectionData.id) {
      case "home":
        return (
          <HomeSection
            nameText={nameText}
            titleText={titleText}
            onContactClick={handleContactClick}
            onViewProjects={scrollToProjects}
            onEnableAudio={handleEnableAudio}
            audioEnabled={audioEnabled}
            playSound={playSound}
          />
        )
      case "skills":
        return <SkillsSection playSound={playSound} />
      case "project1":
        return <Project1Section playSound={playSound} />
      case "project2":
        return <Project2Section playSound={playSound} />
      case "project3":
        return <Project3Section playSound={playSound} />
      case "contact":
        return <ContactSection playSound={playSound} />
      default:
        return (
          <HomeSection
            nameText={nameText}
            titleText={titleText}
            onContactClick={handleContactClick}
            onViewProjects={scrollToProjects}
            onEnableAudio={handleEnableAudio}
            audioEnabled={audioEnabled}
            playSound={playSound}
          />
        )
    }
  }

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* Matrix Background - Only for home section */}
      {currentSection === 0 && <div id="matrix-bg" className="matrix-bg"></div>}

      {/* Current Section */}
      <div className={`min-h-screen ${sections[currentSection].bgColor} relative z-10 transition-all duration-500`}>
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="w-full max-w-6xl mx-auto">
            {/* Desktop Layout */}
            <div className="hidden lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
              {/* Left Side - Section Content */}
              <div className="animate-slide-in-left">{renderCurrentSection()}</div>

              {/* Right Side - Console */}
              <div className="flex justify-center animate-slide-in-right">
                <div className="console-enhanced">
                  <Console
                    currentSection={currentSection}
                    sections={sections}
                    currentTime={currentTime}
                    onNavigate={navigateSection}
                    playSound={playSound}
                  />
                </div>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="lg:hidden space-y-8">
              {/* Console at top for mobile */}
              <div className="flex justify-center animate-bounce-in">
                <div className="console-enhanced">
                  <Console
                    currentSection={currentSection}
                    sections={sections}
                    currentTime={currentTime}
                    onNavigate={navigateSection}
                    isMobile={true}
                    playSound={playSound}
                  />
                </div>
              </div>

              {/* Section content below console for mobile */}
              <div className="animate-slide-in-up">{renderCurrentSection()}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Summary Section */}
      {showProjects && (
        <div ref={projectsRef} className="bg-gray-900 py-16 relative z-10 animate-slide-in-up">
          <ProjectsSummary playSound={playSound} />
        </div>
      )}

      {/* Contact Modal */}
      {showContactModal && <ContactModal onClose={handleCloseModal} playSound={playSound} />}
    </div>
  )
}

function Console({
  currentSection,
  sections,
  currentTime,
  onNavigate,
  isMobile = false,
  playSound,
}: {
  currentSection: number
  sections: any[]
  currentTime: string
  onNavigate: (direction: "prev" | "next") => void
  isMobile?: boolean
  playSound: (type: string) => void
}) {
  const consoleSize = isMobile ? "280px" : "320px"
  const buttonSize = isMobile ? "w-10 h-10" : "w-12 h-12"
  const dPadSize = isMobile ? "w-16 h-16" : "w-20 h-20"

  const handleNavigation = (direction: "prev" | "next") => {
    playSound("button")
    onNavigate(direction)
  }

  const handleButtonClick = () => {
    playSound("button")
  }

  return (
    <div
      className="bg-gray-800 rounded-3xl p-4 lg:p-6 shadow-2xl border-4 border-gray-700 pixel-border"
      style={{ width: consoleSize }}
    >
      {/* Console Header */}
      <div className="flex justify-between items-center mb-3 lg:mb-4 text-xs text-gray-400">
        <div className="flex items-center space-x-1">
          <Clock className="w-3 h-3" />
          <span>{currentTime}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Battery className="w-3 h-3" />
          <span>85%</span>
        </div>
      </div>

      {/* Screen */}
      <div className="bg-green-900 rounded-lg p-3 lg:p-4 mb-4 lg:mb-6 border-4 border-green-800 min-h-[160px] lg:min-h-[200px] pixel-border">
        <div className={`${sections[currentSection].consoleBg} rounded p-3 lg:p-4 h-full pixel-border`}>
          <h3
            className={`${sections[currentSection].consoleTitleColor || "text-black"} text-center font-bold mb-3 lg:mb-4`}
            style={{ fontFamily: '"Press Start 2P", monospace', fontSize: isMobile ? "8px" : "10px" }}
          >
            {sections[currentSection].consoleTitle}
          </h3>
          <div className="flex justify-center">{sections[currentSection].consoleIcon}</div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center">
        {/* D-Pad */}
        <div className="relative">
          <div className={`grid grid-cols-3 gap-1 ${dPadSize}`}>
            <div></div>
            <button
              className="bg-gray-600 hover:bg-gray-500 rounded pixel-button flex items-center justify-center transition-colors"
              onClick={() => handleNavigation("prev")}
            >
              <ChevronUp className="w-3 h-3 lg:w-4 lg:h-4" />
            </button>
            <div></div>
            <button
              className="bg-gray-600 hover:bg-gray-500 rounded pixel-button flex items-center justify-center transition-colors"
              onClick={() => handleNavigation("prev")}
            >
              <ChevronLeft className="w-3 h-3 lg:w-4 lg:h-4" />
            </button>
            <div className="bg-gray-700 rounded"></div>
            <button
              className="bg-gray-600 hover:bg-gray-500 rounded pixel-button flex items-center justify-center transition-colors"
              onClick={() => handleNavigation("next")}
            >
              <ChevronRight className="w-3 h-3 lg:w-4 lg:h-4" />
            </button>
            <div></div>
            <button
              className="bg-gray-600 hover:bg-gray-500 rounded pixel-button flex items-center justify-center transition-colors"
              onClick={() => handleNavigation("next")}
            >
              <ChevronDown className="w-3 h-3 lg:w-4 lg:h-4" />
            </button>
            <div></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 lg:space-x-4">
          <button
            className={`${buttonSize} bg-red-600 hover:bg-red-500 rounded-full flex items-center justify-center font-bold text-white transition-colors pixel-button`}
            style={{ fontFamily: '"Press Start 2P", monospace', fontSize: isMobile ? "8px" : "10px" }}
            onClick={handleButtonClick}
          >
            A
          </button>
          <button
            className={`${buttonSize} bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center font-bold text-white transition-colors pixel-button`}
            style={{ fontFamily: '"Press Start 2P", monospace', fontSize: isMobile ? "8px" : "10px" }}
            onClick={handleButtonClick}
          >
            B
          </button>
        </div>
      </div>
    </div>
  )
}

function HomeSection({
  nameText,
  titleText,
  onContactClick,
  onViewProjects,
  onEnableAudio,
  audioEnabled,
  playSound,
}: {
  nameText: string
  titleText: string
  onContactClick: () => void
  onViewProjects: () => void
  onEnableAudio: () => void
  audioEnabled: boolean
  playSound: (type: string) => void
}) {
  const handleTechClick = (techName: string) => {
    playSound("click")
  }

  return (
    <div className="space-y-8 lg:space-y-12 text-center lg:text-left px-4 lg:px-0 relative z-20">
      <div className="space-y-6 lg:space-y-8">
        {/* Typewriter Text */}
        <div className="min-h-[160px] lg:min-h-[200px] flex flex-col justify-center space-y-4 animate-slide-in-left">
          <h1
            className="text-2xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight typewriter-text animate-float"
            style={{ fontFamily: '"Press Start 2P", monospace' }}
          >
            {nameText}
            <span className="typewriter-cursor">|</span>
          </h1>

          {titleText && (
            <h2
              className="text-lg lg:text-2xl xl:text-3xl font-bold text-purple-500 leading-tight typewriter-text"
              style={{ fontFamily: '"Press Start 2P", monospace' }}
            >
              {titleText}
              <span className="typewriter-cursor">|</span>
            </h2>
          )}
        </div>

        {/* Professional Summary */}
        <div className="space-y-4 animate-slide-in-up">
          <div className="glow-card rounded-lg p-4 lg:p-6">
            <h3
              className="text-purple-400 text-sm lg:text-base font-bold mb-3"
              style={{ fontFamily: '"Press Start 2P", monospace' }}
            >
              PERFIL PROFESIONAL
            </h3>
            <p
              className="text-xs lg:text-sm font-medium text-gray-300 leading-relaxed"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              <strong>Ingeniero en Tecnologías de la Información</strong> con experiencia en desarrollo web y
              aplicaciones empresariales. Experto en React, JavaScript, Java Spring Boot, PHP y .NET. Proactivo,
              adaptable y orientado a resultados.
            </p>
          </div>

          {/* Experience Highlights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 animate-bounce-in">
            <div className="glow-card rounded-lg p-4">
              <h4
                className="text-green-400 text-xs font-bold mb-2"
                style={{ fontFamily: '"Press Start 2P", monospace' }}
              >
                EXPERIENCIA RECIENTE
              </h4>
              <div className="space-y-2 text-xs" style={{ fontFamily: "Montserrat, sans-serif" }}>
                <div className="text-white">
                  <strong>Desarrollador Web Jr</strong> - ALBA DTI
                  <div className="text-gray-400">Feb 2025 - Jul 2025</div>
                </div>
                <div className="text-white">
                  <strong>Desarrollador Web</strong> - Shift F6
                  <div className="text-gray-400">Ene 2025 - Feb 2025</div>
                </div>
              </div>
            </div>

            <div className="glow-card rounded-lg p-4">
              <h4
                className="text-blue-400 text-xs font-bold mb-2"
                style={{ fontFamily: '"Press Start 2P", monospace' }}
              >
                EDUCACIÓN & CERTS
              </h4>
              <div className="space-y-1 text-xs" style={{ fontFamily: "Montserrat, sans-serif" }}>
                <div className="text-white">
                  <strong>Ing. en TI</strong> - UPTx (2021-2024)
                </div>
                <div className="text-gray-400">• Diplomado FullStack - Coderfy</div>
                <div className="text-gray-400">• TOEFL ITP B2</div>
                <div className="text-gray-400">• Cisco Networking Academy</div>
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="glow-card rounded-lg p-4 animate-rotate-in">
            <h4
              className="text-orange-400 text-xs font-bold mb-3"
              style={{ fontFamily: '"Press Start 2P", monospace' }}
            >
              STACK TECNOLÓGICO
            </h4>
            <div className="grid grid-cols-3 lg:grid-cols-5 gap-3">
              {[
                {
                  name: "Java",
                  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
                  color: "hover:bg-red-600",
                },
                {
                  name: "React",
                  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
                  color: "hover:bg-blue-600",
                },
                {
                  name: "PHP",
                  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
                  color: "hover:bg-purple-600",
                },
                {
                  name: "JavaScript",
                  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
                  color: "hover:bg-yellow-600",
                },
                {
                  name: "TypeScript",
                  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
                  color: "hover:bg-blue-700",
                },
                {
                  name: ".NET",
                  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg",
                  color: "hover:bg-indigo-600",
                },
                {
                  name: "MySQL",
                  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
                  color: "hover:bg-orange-600",
                },
                {
                  name: "Angular",
                  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
                  color: "hover:bg-red-700",
                },
                {
                  name: "Node.js",
                  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
                  color: "hover:bg-green-600",
                },
                {
                  name: "Python",
                  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
                  color: "hover:bg-blue-500",
                },
                {
                  name: "Flask",
                  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
                  color: "hover:bg-gray-700",
                },
                {
                  name: "Docker",
                  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
                  color: "hover:bg-blue-400",
                },
                {
                  name: "Git",
                  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
                  color: "hover:bg-orange-500",
                },
                {
                  name: "Flutter",
                  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
                  color: "hover:bg-blue-300",
                },
                {
                  name: "Kotlin",
                  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
                  color: "hover:bg-purple-500",
                },
              ].map((tech, index) => (
                <div
                  key={index}
                  className={`bg-gray-800 ${tech.color} rounded-lg p-2 flex flex-col items-center space-y-1 tech-icon-card transition-all duration-300 cursor-pointer`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => handleTechClick(tech.name)}
                >
                  <img
                    src={tech.icon || "/placeholder.svg"}
                    alt={tech.name}
                    className="w-6 h-6 lg:w-8 lg:h-8 tech-icon-img"
                    onError={(e) => {
                      // Fallback to emoji if icon fails to load
                      const target = e.target as HTMLImageElement
                      target.style.display = "none"
                      const fallback = target.nextElementSibling as HTMLElement
                      if (fallback) fallback.style.display = "block"
                    }}
                  />
                  <div className="text-2xl hidden tech-icon-fallback">
                    {tech.name === "Java" && "☕"}
                    {tech.name === "React" && "⚛️"}
                    {tech.name === "PHP" && "🐘"}
                    {tech.name === "JavaScript" && "⚡"}
                    {tech.name === "TypeScript" && "📘"}
                    {tech.name === ".NET" && "🔷"}
                    {tech.name === "MySQL" && "🗄️"}
                    {tech.name === "Angular" && "🅰️"}
                    {tech.name === "Node.js" && "🟢"}
                    {tech.name === "Python" && "🐍"}
                    {tech.name === "Flask" && "🌶️"}
                    {tech.name === "Docker" && "🐳"}
                    {tech.name === "Git" && "📝"}
                    {tech.name === "Flutter" && "🦋"}
                    {tech.name === "Kotlin" && "🎯"}
                  </div>
                  <span
                    className="text-white text-center font-bold text-xs"
                    style={{ fontFamily: '"Press Start 2P", monospace', fontSize: "6px" }}
                  >
                    {tech.name}
                  </span>
                </div>
              ))}

              {/* Special cards for technologies without standard icons */}
              <div
                className="bg-gray-800 hover:bg-purple-600 rounded-lg p-2 flex flex-col items-center space-y-1 tech-icon-card transition-all duration-300 cursor-pointer"
                onClick={() => handleTechClick("Power Apps")}
              >
                <div className="w-6 h-6 lg:w-8 lg:h-8 bg-purple-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-xs">PA</span>
                </div>
                <span
                  className="text-white text-center font-bold text-xs"
                  style={{ fontFamily: '"Press Start 2P", monospace', fontSize: "6px" }}
                >
                  Power Apps
                </span>
              </div>

              <div
                className="bg-gray-800 hover:bg-green-600 rounded-lg p-2 flex flex-col items-center space-y-1 tech-icon-card transition-all duration-300 cursor-pointer"
                onClick={() => handleTechClick("Supabase")}
              >
                <div className="w-6 h-6 lg:w-8 lg:h-8 bg-green-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-xs">SB</span>
                </div>
                <span
                  className="text-white text-center font-bold text-xs"
                  style={{ fontFamily: '"Press Start 2P", monospace', fontSize: "6px" }}
                >
                  Supabase
                </span>
              </div>

              <div
                className="bg-gray-800 hover:bg-red-600 rounded-lg p-2 flex flex-col items-center space-y-1 tech-icon-card transition-all duration-300 cursor-pointer"
                onClick={() => handleTechClick("SQL Server")}
              >
                <div className="w-6 h-6 lg:w-8 lg:h-8 bg-red-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-xs">SQL</span>
                </div>
                <span
                  className="text-white text-center font-bold text-xs"
                  style={{ fontFamily: '"Press Start 2P", monospace', fontSize: "6px" }}
                >
                  SQL Server
                </span>
              </div>

              <div
                className="bg-gray-800 hover:bg-blue-500 rounded-lg p-2 flex flex-col items-center space-y-1 tech-icon-card transition-all duration-300 cursor-pointer"
                onClick={() => handleTechClick("FlutterFlow")}
              >
                <div className="w-6 h-6 lg:w-8 lg:h-8 bg-blue-500 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-xs">FF</span>
                </div>
                <span
                  className="text-white text-center font-bold text-xs"
                  style={{ fontFamily: '"Press Start 2P", monospace', fontSize: "6px" }}
                >
                  FlutterFlow
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Audio Enable Button */}
        {!audioEnabled && (
          <div className="flex justify-center lg:justify-start mb-4 animate-bounce-in">
            <button
              onClick={onEnableAudio}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-bold transition-colors enhanced-button border-2 border-yellow-400 text-xs"
              style={{ fontFamily: '"Press Start 2P", monospace', fontSize: "8px" }}
            >
              🔊 ACTIVAR SONIDOS
            </button>
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-4 animate-slide-in-up">
          <button
            onClick={onViewProjects}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-bold transition-all enhanced-button border-2 border-orange-300"
            style={{ fontFamily: '"Press Start 2P", monospace', fontSize: "10px" }}
          >
            Ver Proyectos
          </button>
          <button
            onClick={onContactClick}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-bold transition-all enhanced-button shadow-lg border-4 border-purple-400"
            style={{ fontFamily: '"Press Start 2P", monospace', fontSize: "14px" }}
          >
            CONTACTAR
          </button>
        </div>

        {/* Instructions */}
        {audioEnabled && (
          <div className="text-center lg:text-left animate-slide-in-up">
            <p className="text-xs text-gray-500" style={{ fontFamily: "Montserrat, sans-serif" }}>
              💡 Haz clic en cualquier elemento para escuchar efectos de sonido retro
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

function SkillsSection({ playSound }: { playSound: (type: string) => void }) {
  const skills = [
    {
      name: "Java",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
      color: "hover:bg-red-600",
      fallback: "☕",
    },
    {
      name: "React",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      color: "hover:bg-blue-600",
      fallback: "⚛️",
    },
    {
      name: "PHP",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
      color: "hover:bg-purple-600",
      fallback: "🐘",
    },
    {
      name: "JavaScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      color: "hover:bg-yellow-600",
      fallback: "⚡",
    },
    {
      name: "TypeScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      color: "hover:bg-blue-700",
      fallback: "📘",
    },
    {
      name: ".NET",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg",
      color: "hover:bg-indigo-600",
      fallback: "🔷",
    },
    {
      name: "MySQL",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
      color: "hover:bg-orange-600",
      fallback: "🗄️",
    },
    {
      name: "Angular",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
      color: "hover:bg-red-700",
      fallback: "🅰️",
    },
    {
      name: "Node.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      color: "hover:bg-green-600",
      fallback: "🟢",
    },
    {
      name: "Python",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      color: "hover:bg-blue-500",
      fallback: "🐍",
    },
    {
      name: "Flask",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
      color: "hover:bg-gray-700",
      fallback: "🌶️",
    },
    {
      name: "Docker",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      color: "hover:bg-blue-400",
      fallback: "🐳",
    },
    {
      name: "Git",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      color: "hover:bg-orange-500",
      fallback: "📝",
    },
    {
      name: "Flutter",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
      color: "hover:bg-blue-300",
      fallback: "🦋",
    },
    {
      name: "Kotlin",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
      color: "hover:bg-purple-500",
      fallback: "🎯",
    },
    {
      name: "HTML",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      color: "hover:bg-orange-500",
      fallback: "🌐",
    },
    {
      name: "CSS",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
      color: "hover:bg-blue-500",
      fallback: "🎨",
    },
    {
      name: "Laravel",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg",
      color: "hover:bg-red-500",
      fallback: "🔥",
    },
    {
      name: "Tailwind",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
      color: "hover:bg-cyan-500",
      fallback: "💨",
    },
    {
      name: "Express",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
      color: "hover:bg-gray-600",
      fallback: "🛤️",
    },
  ]

  const specialSkills = [
    { name: "Power Apps", color: "hover:bg-purple-600", abbr: "PA" },
    { name: "Supabase", color: "hover:bg-green-600", abbr: "SB" },
    { name: "SQL Server", color: "hover:bg-red-600", abbr: "SQL" },
    { name: "FlutterFlow", color: "hover:bg-blue-500", abbr: "FF" },
    { name: "NestJS", color: "hover:bg-red-500", abbr: "N" },
    { name: "Astro", color: "hover:bg-orange-400", abbr: "A" },
  ]

  const handleSkillClick = (skillName: string) => {
    playSound("click")
  }

  return (
    <div className="space-y-6 lg:space-y-8 px-4 lg:px-0 animate-slide-in-left">
      <h1
        className="text-3xl lg:text-5xl font-bold text-white mb-8 lg:mb-12 animate-bounce-in"
        style={{ fontFamily: '"Press Start 2P", monospace' }}
      >
        Skills
      </h1>

      <div className="grid grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
        {skills.map((skill, index) => (
          <div
            key={index}
            className={`bg-gray-800 ${skill.color} rounded-lg p-3 flex flex-col items-center space-y-2 tech-icon-card transition-all duration-300 cursor-pointer`}
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => handleSkillClick(skill.name)}
          >
            <img
              src={skill.icon || "/placeholder.svg"}
              alt={skill.name}
              className="w-8 h-8 lg:w-12 lg:h-12 tech-icon-img"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = "none"
                const fallback = target.nextElementSibling as HTMLElement
                if (fallback) fallback.style.display = "block"
              }}
            />
            <div className="text-3xl hidden tech-icon-fallback">{skill.fallback}</div>
            <span
              className="text-white text-center font-bold"
              style={{ fontFamily: '"Press Start 2P", monospace', fontSize: "8px" }}
            >
              {skill.name}
            </span>
          </div>
        ))}

        {specialSkills.map((skill, index) => (
          <div
            key={`special-${index}`}
            className={`bg-gray-800 ${skill.color} rounded-lg p-3 flex flex-col items-center space-y-2 tech-icon-card transition-all duration-300 cursor-pointer`}
            style={{ animationDelay: `${(skills.length + index) * 0.1}s` }}
            onClick={() => handleSkillClick(skill.name)}
          >
            <div className="w-8 h-8 lg:w-12 lg:h-12 bg-gray-700 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm lg:text-base">{skill.abbr}</span>
            </div>
            <span
              className="text-white text-center font-bold"
              style={{ fontFamily: '"Press Start 2P", monospace', fontSize: "8px" }}
            >
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Project1Section({ playSound }: { playSound: (type: string) => void }) {
  const handleProjectClick = () => {
    playSound("button")
  }

  return (
    <div className="space-y-6 lg:space-y-8 px-4 lg:px-0">
      {/* Logo */}
      <div className="mb-6 lg:mb-8">
        <div
          className="text-white text-4xl lg:text-6xl font-bold"
          style={{ fontFamily: '"Press Start 2P", monospace' }}
        >
          <div className="flex items-center space-x-2">
            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white rounded-full flex items-center justify-center pixel-border">
              <span className="text-blue-600 text-xl lg:text-2xl">🔗</span>
            </div>
            <div>
              <div className="text-2xl lg:text-4xl">LINKER</div>
              <div className="text-lg lg:text-2xl">PRO</div>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-4 lg:space-y-6">
        <p
          className="text-white text-sm lg:text-lg font-bold leading-relaxed"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          Plataforma en desarrollo para conectar empresas con freelancers de manera fácil y rápida. Mantiene seguridad
          de pago y genera mayor confianza para las empresas, facilitando la conexión entre freelancers y proyectos
          empresariales.
        </p>

        {/* Technologies */}
        <div className="flex space-x-4 lg:space-x-6">
          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-white rounded flex items-center justify-center text-2xl pixel-border">
            <span className="text-blue-600 font-bold text-xs lg:text-sm">R</span>
          </div>
          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-white rounded flex items-center justify-center text-2xl pixel-border">
            <span className="text-blue-700 font-bold text-xs lg:text-sm">TS</span>
          </div>
          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-white rounded flex items-center justify-center text-2xl pixel-border">
            <span className="text-green-600 font-bold text-xs lg:text-sm">SB</span>
          </div>
        </div>

        {/* Button */}
        <a
          href="https://v0-linker-pro-platform-pr4k2trv8-raulgrants-projects.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block border-2 border-blue-200 bg-blue-100 text-blue-800 px-6 py-3 rounded-full font-bold transition-all enhanced-button"
          style={{ fontFamily: '"Press Start 2P", monospace', fontSize: "10px" }}
          onClick={handleProjectClick}
        >
          Ver LinkerPro
        </a>
      </div>
    </div>
  )
}

function Project2Section({ playSound }: { playSound: (type: string) => void }) {
  const handleProjectClick = () => {
    playSound("button")
  }

  return (
    <div className="space-y-6 lg:space-y-8 px-4 lg:px-0">
      {/* Logo */}
      <div className="mb-6 lg:mb-8">
        <div
          className="text-white text-4xl lg:text-6xl font-bold"
          style={{ fontFamily: '"Press Start 2P", monospace' }}
        >
          <div className="flex items-center space-x-2">
            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white rounded-full flex items-center justify-center pixel-border">
              <span className="text-orange-600 text-xl lg:text-2xl">🛒</span>
            </div>
            <div>
              <div className="text-2xl lg:text-4xl">LINKER</div>
              <div className="text-lg lg:text-2xl">STORE</div>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-4 lg:space-y-6">
        <p
          className="text-white text-sm lg:text-lg font-bold leading-relaxed"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          Plataforma e-commerce con afiliados de Amazon y Mercado Libre. Incluye un blog con los mejores artículos
          industriales. Aún en construcción, pero con buen desempeño hasta el momento.
        </p>

        {/* Technologies */}
        <div className="flex space-x-4 lg:space-x-6">
          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-white rounded flex items-center justify-center text-2xl pixel-border">
            <span className="text-blue-600 font-bold text-xs lg:text-sm">R</span>
          </div>
          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-white rounded flex items-center justify-center text-2xl pixel-border">
            <span className="text-blue-700 font-bold text-xs lg:text-sm">TS</span>
          </div>
          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-white rounded flex items-center justify-center text-2xl pixel-border">
            <span className="text-green-600 font-bold text-xs lg:text-sm">SB</span>
          </div>
        </div>

        {/* Button */}
        <a
          href="https://linkerstore2-khb2wm91f-raulgrants-projects.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block border-2 border-orange-200 bg-orange-100 text-orange-800 px-6 py-3 rounded-full font-bold transition-all enhanced-button"
          style={{ fontFamily: '"Press Start 2P", monospace', fontSize: "10px" }}
          onClick={handleProjectClick}
        >
          Ver LinkerStore
        </a>
      </div>
    </div>
  )
}

function Project3Section({ playSound }: { playSound: (type: string) => void }) {
  const handleProjectClick = () => {
    playSound("button")
  }

  return (
    <div className="space-y-6 lg:space-y-8 px-4 lg:px-0">
      {/* Logo */}
      <div className="mb-6 lg:mb-8">
        <div
          className="text-white text-4xl lg:text-6xl font-bold"
          style={{ fontFamily: '"Press Start 2P", monospace' }}
        >
          <div className="flex items-center space-x-2">
            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white rounded-full flex items-center justify-center pixel-border">
              <span className="text-green-600 text-xl lg:text-2xl">🏪</span>
            </div>
            <div>
              <div className="text-2xl lg:text-4xl">TIENDA</div>
              <div className="text-lg lg:text-2xl">ELIZABETH</div>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-4 lg:space-y-6">
        <p
          className="text-white text-sm lg:text-lg font-bold leading-relaxed"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          Sistema de control de inventarios para tienda de abarrotes local. Frontend desarrollado con Angular Standalone
          y Next.js, alojado en Hostinger con backend en Railway.
        </p>

        {/* Technologies */}
        <div className="flex space-x-4 lg:space-x-6">
          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-white rounded flex items-center justify-center text-2xl pixel-border">
            <span className="text-red-600 font-bold text-xs lg:text-sm">A</span>
          </div>
          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-white rounded flex items-center justify-center text-2xl pixel-border">
            <span className="text-black font-bold text-xs lg:text-sm">N</span>
          </div>
          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-white rounded flex items-center justify-center text-2xl pixel-border">
            <span className="text-blue-700 font-bold text-xs lg:text-sm">TS</span>
          </div>
        </div>

        {/* Button */}
        <a
          href="https://tienda-elizabeth.pro"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block border-2 border-green-200 bg-green-100 text-green-800 px-6 py-3 rounded-full font-bold transition-all enhanced-button"
          style={{ fontFamily: '"Press Start 2P", monospace', fontSize: "10px" }}
          onClick={handleProjectClick}
        >
          Ver Tienda Elizabeth
        </a>
      </div>
    </div>
  )
}

function ContactSection({ playSound }: { playSound: (type: string) => void }) {
  const contacts = [
    {
      name: "WhatsApp",
      icon: "💬",
      color: "bg-green-600 hover:bg-green-700",
      url: "https://wa.me/522462387622",
      description: "Envíame un mensaje directo",
    },
    {
      name: "Gmail",
      icon: "📧",
      color: "bg-red-600 hover:bg-red-700",
      url: "mailto:vqrgashernandezrauldejesus@gmail.com",
      description: "Correo profesional",
    },
    {
      name: "GitHub",
      icon: "🐙",
      color: "bg-gray-800 hover:bg-gray-900",
      url: "https://github.com/RaulGrant",
      description: "Revisa mis repositorios",
    },
    {
      name: "LinkedIn",
      icon: "💼",
      color: "bg-blue-600 hover:bg-blue-700",
      url: "https://linkedin.com/in/raul-de-jesus-vargas-hernandez-74g",
      description: "Conectemos profesionalmente",
    },
  ]

  const handleContactClick = () => {
    playSound("button")
  }

  return (
    <div className="space-y-6 lg:space-y-8 px-4 lg:px-0 text-center lg:text-left animate-slide-in-left">
      <h1
        className="text-3xl lg:text-5xl font-bold text-white mb-8 lg:mb-12 animate-bounce-in"
        style={{ fontFamily: '"Press Start 2P", monospace' }}
      >
        Contacto
      </h1>

      <div className="space-y-6 lg:space-y-8">
        {/* Contact Info */}
        <div className="glow-card rounded-lg p-4 lg:p-6 animate-slide-in-up">
          <h3
            className="text-purple-400 text-sm lg:text-base font-bold mb-3"
            style={{ fontFamily: '"Press Start 2P", monospace' }}
          >
            ¡HABLEMOS!
          </h3>
          <p
            className="text-white text-sm lg:text-lg font-bold leading-relaxed mb-4"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            ¿Tienes un proyecto en mente? ¡Estoy disponible para colaborar en proyectos interesantes y desafiantes!
          </p>
          <div className="space-y-2 text-sm" style={{ fontFamily: "Montserrat, sans-serif" }}>
            <div className="text-gray-300">
              <strong>📍 Ubicación:</strong> Tlaxcala / Hidalgo, México
            </div>
            <div className="text-gray-300">
              <strong>📞 Teléfono:</strong> +52 246-238-76-22
            </div>
            <div className="text-gray-300">
              <strong>🌍 Disponibilidad:</strong> Disponible para reubicación
            </div>
          </div>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 animate-rotate-in">
          {contacts.map((contact, index) => (
            <a
              key={index}
              href={contact.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${contact.color} text-white p-4 lg:p-6 rounded-lg flex flex-col items-center space-y-3 transition-all transform hover:scale-105 pixel-button border-2 border-gray-600`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={handleContactClick}
            >
              <div className="text-3xl lg:text-4xl animate-float">{contact.icon}</div>
              <div className="text-center">
                <span
                  className="font-bold block mb-1"
                  style={{ fontFamily: '"Press Start 2P", monospace', fontSize: "10px" }}
                >
                  {contact.name}
                </span>
                <span className="text-xs opacity-80" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  {contact.description}
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Additional Info */}
        <div className="glow-card rounded-lg p-4 animate-slide-in-up">
          <h4 className="text-orange-400 text-xs font-bold mb-2" style={{ fontFamily: '"Press Start 2P", monospace' }}>
            TIEMPO DE RESPUESTA
          </h4>
          <p className="text-gray-300 text-sm" style={{ fontFamily: "Montserrat, sans-serif" }}>
            Generalmente respondo en menos de 24 horas. Para proyectos urgentes, WhatsApp es la mejor opción.
          </p>
        </div>
      </div>
    </div>
  )
}

function ContactModal({ onClose, playSound }: { onClose: () => void; playSound: (type: string) => void }) {
  const contacts = [
    {
      name: "WhatsApp",
      icon: "💬",
      color: "bg-green-600",
      url: "https://wa.me/522462387622",
    },
    {
      name: "Gmail",
      icon: "📧",
      color: "bg-red-600",
      url: "mailto:vqrgashernandezrauldejesus@gmail.com",
    },
    {
      name: "GitHub",
      icon: "🐙",
      color: "bg-gray-800",
      url: "https://github.com/RaulGrant",
    },
    {
      name: "LinkedIn",
      icon: "💼",
      color: "bg-blue-600",
      url: "https://linkedin.com/in/raul-de-jesus-vargas-hernandez-74g",
    },
  ]

  const handleContactClick = () => {
    playSound("button")
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 modal-overlay">
      <div className="bg-gray-900 rounded-lg border-4 border-purple-500 p-6 lg:p-8 max-w-md w-full modal-content pixel-border">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-6">
          <h2
            className="text-xl lg:text-2xl font-bold text-white"
            style={{ fontFamily: '"Press Start 2P", monospace' }}
          >
            CONTACTO
          </h2>
          <button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 text-white w-8 h-8 rounded flex items-center justify-center pixel-button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Contact Buttons */}
        <div className="grid grid-cols-2 gap-4">
          {contacts.map((contact, index) => (
            <a
              key={index}
              href={contact.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${contact.color} text-white p-4 rounded-lg flex flex-col items-center space-y-2 transition-all transform hover:scale-105 pixel-button border-2 border-gray-600`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={handleContactClick}
            >
              <div className="text-2xl animate-float">{contact.icon}</div>
              <span
                className="font-bold text-center"
                style={{ fontFamily: '"Press Start 2P", monospace', fontSize: "8px" }}
              >
                {contact.name}
              </span>
            </a>
          ))}
        </div>

        {/* Close Button */}
        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded font-bold pixel-button border-2 border-gray-500"
            style={{ fontFamily: '"Press Start 2P", monospace', fontSize: "10px" }}
          >
            CERRAR
          </button>
        </div>
      </div>
    </div>
  )
}

function ProjectsSummary({ playSound }: { playSound: (type: string) => void }) {
  const projects = [
    {
      name: "LinkerPro",
      description: "Plataforma para conectar empresas con freelancers",
      technologies: ["React", "TypeScript", "Supabase"],
      color: "bg-blue-600",
      logo: "🔗",
      url: "https://v0-linker-pro-platform-pr4k2trv8-raulgrants-projects.vercel.app",
    },
    {
      name: "LinkerStore",
      description: "E-commerce con afiliados Amazon y Mercado Libre",
      technologies: ["React", "TypeScript", "Supabase"],
      color: "bg-orange-600",
      logo: "🛒",
      url: "https://linkerstore2-khb2wm91f-raulgrants-projects.vercel.app",
    },
    {
      name: "Tienda Elizabeth",
      description: "Control de inventarios para tienda de abarrotes",
      technologies: ["Angular", "Next.js", "TypeScript"],
      color: "bg-green-600",
      logo: "🏪",
      url: "https://tienda-elizabeth.pro",
    },
  ]

  const handleProjectClick = () => {
    playSound("button")
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h2
        className="text-3xl lg:text-4xl font-bold text-white text-center mb-12"
        style={{ fontFamily: '"Press Start 2P", monospace' }}
      >
        Mis Proyectos
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <div key={index} className={`${project.color} rounded-lg p-6 text-white pixel-border`}>
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl pixel-border">
                {project.logo}
              </div>
              <h3 className="text-lg font-bold" style={{ fontFamily: '"Press Start 2P", monospace', fontSize: "12px" }}>
                {project.name}
              </h3>
            </div>

            <p className="text-sm mb-4 font-medium" style={{ fontFamily: "Montserrat, sans-serif" }}>
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="bg-white bg-opacity-20 px-2 py-1 rounded text-xs font-bold pixel-border"
                  style={{ fontFamily: '"Press Start 2P", monospace', fontSize: "8px" }}
                >
                  {tech}
                </span>
              ))}
            </div>

            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded font-bold transition-colors flex items-center space-x-2 pixel-button"
              style={{ fontFamily: '"Press Start 2P", monospace', fontSize: "8px" }}
              onClick={handleProjectClick}
            >
              <span>Ver Proyecto</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
