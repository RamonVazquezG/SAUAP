package mx.sauap;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.hibernate.annotations.ColumnDefault;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "unidad_aprendizaje")
public class UnidadAprendizaje {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_unidad", nullable = false)
    private Integer id;

    @Size(max = 50)
    @NotNull
    @Column(name = "nombre", nullable = false, length = 50)
    private String nombre;

    @NotNull
    @ColumnDefault("0")
    @Column(name = "horas_clase", nullable = false)
    private Byte horasClase;

    @NotNull
    @ColumnDefault("0")
    @Column(name = "horas_taller", nullable = false)
    private Byte horasTaller;

    @NotNull
    @ColumnDefault("0")
    @Column(name = "horas_laboratorio", nullable = false)
    private Byte horasLaboratorio;

    @OneToMany(mappedBy = "idUnidad")
    private Set<Asignacion> asignacions = new LinkedHashSet<>();

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Byte getHorasClase() {
        return horasClase;
    }

    public void setHorasClase(Byte horasClase) {
        this.horasClase = horasClase;
    }

    public Byte getHorasTaller() {
        return horasTaller;
    }

    public void setHorasTaller(Byte horasTaller) {
        this.horasTaller = horasTaller;
    }

    public Byte getHorasLaboratorio() {
        return horasLaboratorio;
    }

    public void setHorasLaboratorio(Byte horasLaboratorio) {
        this.horasLaboratorio = horasLaboratorio;
    }

    public Set<Asignacion> getAsignacions() {
        return asignacions;
    }

    public void setAsignacions(Set<Asignacion> asignacions) {
        this.asignacions = asignacions;
    }

}