package mx.sauap.servlet;

import mx.sauap.entity.UnidadAprendizaje;
import mx.sauap.facade.FacadeUnidadAprendizaje;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("/AltaUnidadServlet")
public class AltaUnidadServlet extends HttpServlet {

    private final FacadeUnidadAprendizaje facade = new FacadeUnidadAprendizaje();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String nombre = request.getParameter("nombre");
        String horasClaseStr = request.getParameter("horasClase");
        String horasTallerStr = request.getParameter("horasTaller");
        String horasLabStr = request.getParameter("horasLaboratorio");

        String errorMessage = null;

        if(nombre == null || nombre.trim().isEmpty() ||
                horasClaseStr == null || horasClaseStr.trim().isEmpty() ||
                horasTallerStr == null || horasTallerStr.trim().isEmpty() ||
                horasLabStr == null || horasLabStr.trim().isEmpty()) {
            errorMessage = "Todos los campos son obligatorios.";
        }

        if(errorMessage == null){
            try {
                UnidadAprendizaje unidad = new UnidadAprendizaje();
                unidad.setNombre(nombre);
                unidad.setHorasClase(Byte.parseByte(horasClaseStr));
                unidad.setHorasTaller(Byte.parseByte(horasTallerStr));
                unidad.setHorasLaboratorio(Byte.parseByte(horasLabStr));

                facade.saveUnidad(unidad);

                response.sendRedirect("sauap.xhtml?successMessage=Unidad+registrada+correctamente");
                return;
            } catch (NumberFormatException e) {
                errorMessage = "Las horas deben ser números válidos.";
            }
        }

        response.sendRedirect("sauap.xhtml?errorMessage=" + java.net.URLEncoder.encode(errorMessage, "UTF-8"));
    }
}
