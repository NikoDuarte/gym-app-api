const getSideBar = (role: string) => {
    const sidebar_user = [
        {
          title: 'Mis clases', 
          path: '/gym-style/mis-clases',
        }
    ]
    const sidebar_admin = [
        {
          title: 'Usuarios', 
          path: '/gym-style/usuarios',
        }
    ]
    if (role === 'ADMIN-ROLE') {
        return sidebar_admin
    }else {
        return sidebar_user
    }

}

export {
  getSideBar
}