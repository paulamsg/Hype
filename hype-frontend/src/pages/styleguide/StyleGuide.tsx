import './StyleGuide.scss';
import Button from '../../components/ui/Button'
const StyleGuide = () =>{
    return (
        <>
        <div>
            <h1>Colores principales de la aplicación</h1>
            <div className='display-colors'>
                <div className="colors color-primary"><code>#0057FF</code></div>
                <div className="colors color-secondary"><code>#E8FF00</code></div>
                <div className="colors color-black"><code>#111111</code></div>
                <div className="colors color-background"><code>#FFFFF</code></div>
            </div>
            
        </div>
        <div>
            <h1> Botones de la aplicación</h1>
            <div>
                
            </div>
            <h2>Botón de login y registro</h2>
            <Button 
            label="Crear cuenta →" 
            variant="primary" 
            size="xl" 
            type="submit" 
            />
            <Button 
            label="Entrar →" 
            variant="primary" 
            size="xl" 
            type="submit" 
            />
            <Button 
            label="Google" 
            variant="outline" 
            size="xl" 
            type="submit" 
            />
            <h2>Botones del modal</h2>
            <Button 
                label="Cancelar" 
                variant="outline" 
                size="md"
                onClick = {() => {}}
            />
            <Button 
                label="Mandar al grupo" 
                variant="primary" 
                size="md"
                onClick = {() => {}}
            />
            <h2>Botones de NOTIFICACIONES</h2>
            <Button 
                label="¡Vamos!" 
                variant="primary" 
                size="sm"
                onClick = {() => {}}
            />
            <Button 
                label="Ahora no" 
                variant="outline" 
                size="sm"
                onClick = {() => {}}
            />
            <Button 
                label=" + Seguir también" 
                variant="primary" 
                size="sm"
                onClick = {() => {}}
            />
            <h2>Botones de FEED DE AMIGOS</h2>
            <Button 
                label=" Ver evento → " 
                variant="outline" 
                size="sm"
                onClick = {() => {}}
            />
            <Button 
                label="Ir juntos" 
                variant="primary" 
                size="sm"
                onClick = {() => {}}
            />
            <Button 
                label="✓ Enviado" 
                variant="confirm" 
                size="sm"
                onClick = {() => {}}
            />
            <Button 
                label="Seguir" 
                variant="outline" 
                size="sm"
                onClick = {() => {}}
            />
            <Button 
                label="Siguiendo" 
                variant="outline-blue" 
                size="sm"
                onClick = {() => {}}
            />
            <Button 
                label="Pendiente" 
                variant="outline" 
                size="sm"
                onClick = {() => {}}
            />
            <h2>Botones de GRUPOS</h2>
            <Button 
                label=" + Crear grupo" 
                variant="primary" 
                size="md"
                onClick = {() => {}}
            />
            <Button 
                label="+ Añadir amigo" 
                variant="primary" 
                size="sm"
                onClick = {() => {}}
            />
            <Button 
                label="Editar" 
                variant="outline" 
                size="sm"
                onClick = {() => {}}
            />
            <Button 
                label=" Ver evento → " 
                variant="outline" 
                size="sm"
                onClick = {() => {}}
            />
            <Button 
                label="Ir juntos" 
                variant="primary" 
                size="sm"
                onClick = {() => {}}
            />
            <Button 
                label="✓ Enviado" 
                variant="confirm" 
                size="sm"
                onClick = {() => {}}
            />
            <h2>Botones PERFIL</h2>
            <Button 
                label="✎ Editar perfil" 
                variant="outline" 
                size="md"
                onClick = {() => {}}
            />
        </div>
        
        <table>
            <thead>
                <tr>
                    <th>Elemento</th>
                    <th>Ejemplo</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>h1</td>
                    <td><h1>Esto es un h1</h1></td>
                </tr>
                <tr>
                    <td>h2</td>
                    <td><h2>Esto es un h2</h2></td>
                </tr>
                <tr>
                    <td>h3</td>
                    <td><h3>Esto es un h3</h3></td>
                </tr>
                <tr>
                    <td>h4</td>
                    <td><h4>Esto es un h4</h4></td>
                </tr>
                <tr>
                    <td>h5</td>
                    <td><h5>Esto es un h5</h5></td>
                </tr>
                <tr>
                    <td>h6</td>
                    <td><h6>Esto es un h6</h6></td>
                </tr>
                <tr>
                    <td>p</td>
                    <td><p>Esto es un párrafo</p></td>
                </tr>
                <tr>
                    <td>Botón</td>
                    <td><button>Esto es un botón</button></td>
                </tr>
                <tr>
                    <td>Label</td>
                    <td><label>Esto es un label</label></td>
                </tr>
                <tr>
                    <td>Input</td>
                    <td><input placeholder="escribe aquí"></input></td>
                </tr>
                <tr>
                    <td>Radio button</td>
                    <td><input type="radio"></input><label>Radio button</label></td>
                </tr>
                <tr>
                    <td>Select</td>
                    <td><select><option>Opción</option></select></td>
                </tr>
            </tbody>
        </table>
        </>
    )
}
export default StyleGuide;