import React from 'react';
import './Modal.css'
const Modal = ({
	children,
	estado,
	cambiarEstado,
	titulo = 'Alerta',
	mostrarHeader,
	cerrar=true
}) => {
	return (
		<>
			{estado && 
				<div className='overlay'>
					<div className='contenedorModal'>
						{mostrarHeader && 
							<div className='encabezadoModal'>
								<h3>{titulo}</h3>
							</div>
						}
						{ cerrar &&
						<button  className='botonCerrar' onClick={() => cambiarEstado(false)}>
							x
						</button>
						}
						{children}
					</div>
				</div>
			}
		</>
	);
}
 
export default Modal;




