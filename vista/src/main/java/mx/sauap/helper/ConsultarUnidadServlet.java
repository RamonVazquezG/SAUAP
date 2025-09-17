package mx.sauap.helper;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import mx.sauap.entity.UnidadAprendizaje;
import mx.sauap.facade.FacadeUnidadAprendizaje;

import java.io.IOException;
import java.util.List;

@WebServlet("/consultarUA")
public class ConsultarUnidadServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        FacadeUnidadAprendizaje facade = new FacadeUnidadAprendizaje();
        List<UnidadAprendizaje> lista = facade.getAllUnidades();


        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        // Usando Gson para convertir a JSON
        com.google.gson.Gson gson = new com.google.gson.Gson();
        String json = gson.toJson(lista);

        resp.getWriter().write(json);
    }
}

