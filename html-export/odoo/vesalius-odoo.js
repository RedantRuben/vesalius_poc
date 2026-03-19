(function () {
  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
      return;
    }
    fn();
  }

  ready(function () {
    var header = document.querySelector("[data-vo-header]");
    var mobilePanel = document.querySelector("[data-vo-mobile-nav]");
    var toggleButtons = document.querySelectorAll("[data-vo-nav-toggle]");
    var navLinks = document.querySelectorAll("[data-vo-nav-link]");
    var revealNodes = document.querySelectorAll("[data-vo-reveal]");
    var sections = document.querySelectorAll("[data-vo-section]");

    function setExpanded(expanded) {
      if (!mobilePanel || !header) {
        return;
      }

      mobilePanel.classList.toggle("is-open", expanded);
      header.classList.toggle("is-open", expanded);

      toggleButtons.forEach(function (button) {
        button.setAttribute("aria-expanded", expanded ? "true" : "false");
      });
    }

    function closeNav() {
      setExpanded(false);
    }

    function updateHeader() {
      if (!header) {
        return;
      }

      var shouldScroll = window.scrollY > 20;
      header.classList.toggle("is-scrolled", shouldScroll);
    }

    function setActiveNav(target) {
      navLinks.forEach(function (link) {
        var isActive = link.getAttribute("data-vo-target") === target;
        link.classList.toggle("active", isActive);
        link.setAttribute("aria-current", isActive ? "page" : "false");
      });
    }

    toggleButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        var expanded = button.getAttribute("aria-expanded") === "true";
        setExpanded(!expanded);
      });
    });

    document.addEventListener("click", function (event) {
      if (!header || !mobilePanel || !mobilePanel.classList.contains("is-open")) {
        return;
      }

      if (!header.contains(event.target)) {
        closeNav();
      }
    });

    document.querySelectorAll("[data-vo-mobile-nav] a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    if ("IntersectionObserver" in window && sections.length) {
      var sectionObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              setActiveNav(entry.target.getAttribute("data-vo-section"));
            }
          });
        },
        {
          rootMargin: "-20% 0px -60% 0px",
          threshold: 0
        }
      );

      sections.forEach(function (section) {
        sectionObserver.observe(section);
      });
    }

    if ("IntersectionObserver" in window && revealNodes.length) {
      var revealObserver = new IntersectionObserver(
        function (entries, observer) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) {
              return;
            }

            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          });
        },
        {
          threshold: 0.14
        }
      );

      revealNodes.forEach(function (node) {
        revealObserver.observe(node);
      });
    } else {
      revealNodes.forEach(function (node) {
        node.classList.add("is-visible");
      });
    }
  });
})();
