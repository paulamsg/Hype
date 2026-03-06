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
        <Button 
            label="Entrar" 
            variant="primary" 
            size="xl" 
            type="submit" 
        />

        <Button 
            label="Cancelar" 
            variant="outline" 
            size="md"
            onClick = {() => {}}
        />

        <Button 
            label="Eliminar" 
            variant="danger" 
            size="sm"
            onClick = {() => {}}
        />
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