package mx.sauap.helper;

import mx.sauap.helper.LoginHelper;
import mx.sauap.entity.Usuario;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/LoginServlet")
public class LoginServlet extends HttpServlet {

    private final LoginHelper loginHelper = new LoginHelper();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String usuario = request.getParameter("usuario");
        String contrasena = request.getParameter("contrasena");

        Usuario usuarioLogin = loginHelper.Login(usuario, contrasena);

        if (usuarioLogin != null) {
            // Credenciales correctas → guardar sesión y redirigir
            request.getSession().setAttribute("usuario", usuarioLogin);
            response.sendRedirect("sauap.xhtml");
        } else {
            // Credenciales incorrectas → enviar mensaje de error de vuelta al login
            request.setAttribute("errorMessage", "Usuario o contraseña incorrectos. Por favor, inténtelo de nuevo.");
            request.getRequestDispatcher("login.xhtml").forward(request, response);
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Redirigir GET al login
        response.sendRedirect("login.xhtml");
    }
}
