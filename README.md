# 7 días para Helena — archivos fuente

Esta carpeta contiene los archivos del proyecto romántico para GitHub Pages, incluido el audio del Día 3.

## Archivos
- `index.html`: estructura y pantalla de código secreto.
- `style.css`: diseño adaptable a celular, en rojo oscuro y rosa.
- `script.js`: calendario de siete días, bloqueos diarios y progreso guardado en el navegador.
- `dia3-no-silence.mp3`: fragmento musical usado en la sorpresa del Día 3.

## Antes de publicar
1. Abre `script.js`.
2. Busca `const SECRET_CODE = "HELENA2026";` y cámbialo por el código privado de Helena.
3. Busca `const OWNER_CODE = "DANIELREVISION7";` y cámbialo por tu propio código de revisión. Este código abre los siete días sin guardar aperturas ni modificar el progreso de Helena. No reutilices el código de Helena.
4. Sube `index.html`, `style.css`, `script.js` y `README.md` a la raíz del repositorio de GitHub.
5. En GitHub, entra en **Settings → Pages**, selecciona la rama principal y la carpeta `/ (root)` y guarda.

## Cómo funciona
- La fecha de inicio se guarda cuando se introduce el código correcto por primera vez.
- Se habilita el Día 1 ese día; después se habilita un día nuevo por cada fecha de calendario transcurrida.
- Los siete días siempre aparecen en el calendario; los futuros se muestran con candado.
- Los días disponibles se pueden volver a abrir.
- El estado se guarda en `localStorage` del navegador de ese celular.
- El código del propietario abre una vista de revisión con los siete días desbloqueados. En ese modo no se guarda ninguna apertura ni se modifica la fecha de inicio o el progreso de Helena.
- El botón «Cambiar código / modo de revisión» permite volver a la pantalla de acceso para cambiar entre los dos modos sin borrar el progreso.

## Limitación importante
GitHub Pages solo publica archivos estáticos. Ambos códigos quedan dentro de `script.js` y una persona con conocimientos puede inspeccionarlos; son una barrera casual, no una autenticación segura. El modo de revisión no cambia el progreso de Helena en el navegador, pero no es un sistema de seguridad real. El progreso también se puede reiniciar si se borran los datos del navegador, se cambia de navegador o se modifica la fecha del teléfono. Sin servidor, no se puede garantizar el desbloqueo diario contra manipulación.

## Estado del contenido
El Día 3 reproduce `dia3-no-silence.mp3`, recortado desde 00:13 hasta el final disponible del archivo original (aproximadamente 01:25 de duración total; el fragmento dura cerca de 1 minuto y 12 segundos). El Día 4 está aprobado en concepto, pero las interacciones finales y algunos contenidos de los días 3, 4 y 6 todavía requieren completar e integrar. Los días 5 y 7 muestran la idea aprobada, pendiente de integrar sus interacciones finales y dedicatorias exactas. No se ha generado un ZIP nuevo en esta actualización.
