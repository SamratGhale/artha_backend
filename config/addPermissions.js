const mongo = require('mongoose');
const RoleController = require('../modules/users/role.controllers')
const UserController = require('../modules/users/user.controllers')
mongo.connect('mongodb://localhost:27017/artha')

Role = RoleController.Role;
User = UserController.User;

const roleAdder = async () => {
    await Role.register({
        name: 'Super Admin',
        permissions: [
            'app_admin',
            'user_write',
            'user_delete',
            'user_read',
            'user_list',
            'user_admin',
            'inventory_read',
            'inventory_write',
            'inventory_remove',
        ],
    });
    await Role.register({
        name: 'Admin',
        permissions: [
            'app_admin',
            'user_write',
            'user_delete',
            'user_read',
            'user_list',
            'user_admin',
            'inventory_read',
            'inventory_write',
            'inventory_remove',
        ],
        is_system: true
    });
    await Role.register({
        name: 'Staff',
        permissions: [
            'inventory_read',
            'inventory_write',
        ],
    });
    console.log('Admin Role is Added');
    console.log('Super Admin Role Added');
    console.log('Staff Manager Role Added');
}
const userAdder=async()=>{
    await User.register({
        email:'samrat.biz19@gmail.com',
        password:'admin123',
        role: "SUPER ADMIN"
    })
}

userAdder();

//roleAdder();
