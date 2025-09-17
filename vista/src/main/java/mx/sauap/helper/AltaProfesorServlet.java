package mx.sauap.helper;

import mx.sauap.entity.Profesor;
import mx.sauap.facade.FacadeProfesor;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("/AltaProfesorServlet")
public class AltaProfesorServlet extends HttpServlet {

    private final FacadeProfesor facadeProfesor = new FacadeProfesor();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // tomar los parametros
        String nombre = request.getParameter("nombre");
        String apellidoPaterno = request.getParameter("apellido1");
        String apellidoMaterno = request.getParameter("apellido2");
        String rfc = request.getParameter("rfc");

        String errorMessage = null;

        // validar
        if(nombre == null || nombre.trim().isEmpty() ||
                apellidoPaterno == null || apellidoPaterno.trim().isEmpty() ||
                apellidoMaterno == null || apellidoMaterno.trim().isEmpty() ||
                rfc == null || rfc.trim().isEmpty()) {
            errorMessage = "Todos los campos son obligatorios.";
        }

        // checar si el rfc existe
        else if(facadeProfesor.existeRFC(rfc)){
            errorMessage = "El RFC ya está registrado en la base de datos.";
        }

        if(errorMessage == null){
            Profesor profesor = new Profesor();
            profesor.setNombre(nombre);
            profesor.setApellidoPaterno(apellidoPaterno);
            profesor.setApellidoMaterno(apellidoMaterno);
            profesor.setRfc(rfc);

            // guardar en la base de datos
            facadeProfesor.saveProfesor(profesor);

            request.setAttribute("successMessage", "Profesor registrado correctamente.");
        } else {
            request.setAttribute("errorMessage", errorMessage);
        }

        // Reenviar al formulario
        request.getRequestDispatcher("sauap.xhtml").forward(request, response);
    }
}
