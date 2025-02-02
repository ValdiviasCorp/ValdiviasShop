import Swal from 'sweetalert2';

export const confirmDelete = () => {
  return Swal.fire({
    title: '¿Estás seguro?',
    text: "¡No podrás revertir esto!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#dc3545',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  });
};

export const showSuccess = (message: string) => {
  return Swal.fire({
    icon: 'success',
    title: '¡Éxito!',
    text: message,
    timer: 1500,
    showConfirmButton: false
  });
};

export const showError = (message: string) => {
  return Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: message
  });
};