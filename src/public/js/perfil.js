const cerrarSesion = document.querySelector('#cerrarSesion')

cerrarSesion.addEventListener('click', async() => {
    try {
        const response = await fetch("/api/sessions/logout");
        if (response.status === 201 || response.status < 300)
          window.location.href = "/";
      } catch (e) {
        console.log("error", e);
      }
})
