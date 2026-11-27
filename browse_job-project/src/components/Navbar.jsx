
import React, { useEffect, useRef, useState } from "react"
import logo from "../assets/images/Gigs_hub.png"
import { NavLink } from "react-router-dom"
import { CgMenuRightAlt } from "react-icons/cg"
import { AiOutlineClose } from "react-icons/ai"

const Navbar = ({ Slogan = "Built for Every Hustle" }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navbarRef = useRef(null)
  const menuButtonRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Close the menu when clicking outside the Navbar.
  useEffect(() => {
    if (!isMobileMenuOpen) return

    const handleOutsideClick = (event) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleOutsideClick)
    document.addEventListener("touchstart", handleOutsideClick)

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
      document.removeEventListener("touchstart", handleOutsideClick)
    }
  }, [isMobileMenuOpen])

  // Close the menu with Escape and return focus to the toggle button.
  useEffect(() => {
    if (!isMobileMenuOpen) return

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    document.addEventListener("keydown", handleEscapeKey)

    return () => {
      document.removeEventListener("keydown", handleEscapeKey)
    }
  }, [isMobileMenuOpen])

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const handleMenuToggle = () => {
    setIsMobileMenuOpen((previousState) => !previousState)
  }

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-white bg-black/80 hover:bg-black rounded-md px-3 py-2 mt-3 transition-all duration-300"
      : "text-white hover:bg-black/30 hover:text-white rounded-md px-3 py-2 mt-3 transition-all duration-300"

  const mobileLinkClass = ({ isActive }) =>
    isActive
      ? "block w-full text-white bg-black/80 rounded-md px-4 py-3 transition-all duration-300"
      : "block w-full text-white hover:bg-black/30 hover:text-white rounded-md px-4 py-3 transition-all duration-300"

  return (
    <nav
      ref={navbarRef}
      className={`
        sticky top-0 z-50
        transition-all duration-500 ease-in-out 
        ${
          isScrolled
            ? "bg-[#1E3A8A]/75 backdrop-blur-md shadow-lg border-b border-white/20"
            : "navbg shadow-lg border-b border-transparent"
        }
      `}
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex flex-1 items-center justify-between md:items-stretch md:justify-start">

            <NavLink
              className="flex flex-shrink-0 items-center mr-4"
              to="/"
              onClick={closeMobileMenu}
            >
              <img
                className="object-cover h-20 w-auto"
                src={logo}
                alt="Gigs Hub"
              />

              <span className="hidden md:block text-white text-xl font-bold ml-2">
                {Slogan}
              </span>
            </NavLink>

            {/* Desktop navigation - unchanged */}
            <div className="hidden md:block md:ml-auto mt-1">
              <div className="flex space-x-2">
                <NavLink to="/" className={linkClass}>
                  Home
                </NavLink>

                <NavLink to="/jobs" className={linkClass}>
                  Jobs
                </NavLink>

                <NavLink to="/add-job" className={linkClass}>
                  Add Job
                </NavLink>
              </div>
            </div>

          </div>

          {/* Mobile menu toggle */}
          <button
            ref={menuButtonRef}
            type="button"
            onClick={handleMenuToggle}
            className="
              md:hidden inline-flex items-center justify-center
              w-12 h-12 rounded-lg text-white
              hover:bg-black/30
              focus:outline-none focus:ring-2 focus:ring-white/70
              transition-all duration-300
            "
            aria-label={
              isMobileMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation-menu"
          >
            <span
              className={`
                flex items-center justify-center
                transition-all duration-300 ease-in-out
                ${isMobileMenuOpen ? "rotate-0" : "rotate-0"}
              `}
            >
              {isMobileMenuOpen ? (
                <AiOutlineClose
                  size={27}
                  className="transition-transform duration-300"
                />
              ) : (
                <CgMenuRightAlt
                  size={30}
                  className="transition-transform duration-300"
                />
              )}
            </span>
          </button>
        </div>

        {/* Mobile navigation menu */}
        <div
          id="mobile-navigation-menu"
          aria-hidden={!isMobileMenuOpen}
          className={`
            md:hidden overflow-hidden
            transition-all duration-300 ease-in-out
            ${
              isMobileMenuOpen
                ? "max-h-96 opacity-100 translate-y-0 pb-4"
                : "max-h-0 opacity-0 -translate-y-2 pointer-events-none"
            }
          `}
        >
          <div className="border-t border-white/20 pt-2">
            <div className="flex flex-col gap-1">
              <NavLink
                to="/"
                className={mobileLinkClass}
                onClick={closeMobileMenu}
                tabIndex={isMobileMenuOpen ? 0 : -1}
              >
                Home
              </NavLink>

              <NavLink
                to="/jobs"
                className={mobileLinkClass}
                onClick={closeMobileMenu}
                tabIndex={isMobileMenuOpen ? 0 : -1}
              >
                Jobs
              </NavLink>

              <NavLink
                to="/add-job"
                className={mobileLinkClass}
                onClick={closeMobileMenu}
                tabIndex={isMobileMenuOpen ? 0 : -1}
              >
                Add Job
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar