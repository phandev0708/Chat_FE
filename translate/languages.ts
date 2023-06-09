type languageOptions = {
    [locate: string]: {
        [term: string]: string;
    };
};

export const languageDirectory: languageOptions = {
    vi: {
        male: 'Nam',
        female: 'Nữ',
        // left menu
        app: 'Ứng Dụng',
        personal: 'Cá Nhân',
        member: 'Thành Viên',
        config: 'Cấu Hình',
        search: 'tìm kiếm ứng dụng...',
        hi: 'Chào ',
        good: ' Chúc bạn một ngày làm việc hiệu quả!',
        // profile
        profile: 'Thông Tin Cá Nhân',
        password: 'Mật khẩu',
        image: 'Ảnh đại diện',
        email: 'Email',
        DOB: 'Ngày sinh',
        username: 'Họ và tên',
        gender: 'Giới tính',
        phone: 'Số điện thoại',
        newPassword: 'Mật khẩu mới',
        confirmPassword: 'Nhập lại mật khẩu',
        validateUserName: 'Bạn Chưa Nhập Họ Và Tên',
        selectImage: 'Chọn ảnh đại diện',
        currentAvatar: 'Ảnh đại diện hiện tại',
        selectFile: 'Chọn Ảnh',
        submit: 'Cập Nhật',
        successful: 'Cập nhật thành công',
        role: 'Phân Quyền',
        roleName: 'Tên phân quyền',
        // member page
        user: 'Họ & Tên',
        createdAt: 'Ngày tạo',
        action: 'Hoạt động',
        moreMembers: 'Thêm thành viên',
        findMembers: 'Tìm thành viên',
        general: 'Cài đặt chung',
        // login
        EnterYourDetailsBelow: 'Nhập thông tin chi tiết của bạn dưới đây.',
        rememberMe: 'Nhớ mật khẩu',
        dontHaveAnAccount: 'Không có tài khoản?',
        signUp: 'Đăng ký',
        signIn: 'Đăng nhập',
        forgotPassword: 'Quên mật khẩu',
        signInToERPOryza: 'Đăng nhập vào ERP Oryza',
        createYourAccount: 'Tạo tài khoản của bạn',
        iAgreeToTheTerm: 'Đồng ý điều khoản & Điều kiện',
        createMyAccount: 'Tạo tài khoản của tôi',
        alreadyHaveAnAccount: 'Bạn đã có tài khoản?',
        forgotPasswordDescription:
            'vui lòng nhập địa chỉ email đã đăng ký của bạn. Chúng tôi sẽ gửi hướng dẫn để giúp đặt lại mật khẩu của bạn',
        sendRequestIntructions: 'Gửi yêu cầu hướng dẫn',
        loggedInSuccessfully: 'Đăng nhập thành công',
        wrongEmailOrƠassword: 'Email hoặc mật khẩu sai',
        passwordincorrect: 'Mật Khẩu Không Khớp',
        signUpSuccess: 'Đăng ký thành công',
        registrationFailed: 'Đăng ký không thành công',
        createAccount: 'Tạo tài khoản',
        uploadFromExcelFile: 'Tạo tài khoản từ Excel',
        // create account
        youHaveNotEnteredEmail: 'Bạn Chưa Nhập Email',
        invalidEmail: 'Email Không Hợp lệ.  Example(example@oryza.vn)',
        YouDidNotEnterAphoneNumber: 'Bạn Chưa Nhập Số Điện Thoại',
        invalidPhoneNumber: 'Số Điện Thoại Không Hợp Lệ',
        youHaveNotEnteredPassword: 'Bạn Chưa Nhập Mật Khẩu',
        thePasswordIsTooShort: 'Mật khẩu quá ngắn',
        validate: 'Vui lòng kiểm tra lại thông tin trước khi tạo tài khoản',
        cancel: 'Đóng',
        setting: 'Cài Đặt',
        loginManagement: ' Quản Lý Đăng Nhập',
        loginDevices: 'Thiết bị đăng nhập',
        logout: 'Đăng xuất',
        CommonlyUsedApplications: 'Ứng Dụng Thường Dùng',
        description: 'Mô tả',
        addRoleGroup: 'Thêm nhóm quyền',
        RoleGroupName: 'Tên nhóm quyền',
        keyshort: 'Từ Khoá',
        generalManagementRights: 'Quyền quản lý chung',
        FullSystemAuthority: 'Toàn quyền hệ thống',
        DecentralizedAdministration: 'Quản trị phân quyền',
        ReadPermissions: 'Xem phân quyền',
        CreatePermissions: 'Tạo phân quyền',
        UpdatePermissions: 'Sửa phân quyền',
        DeletePermissions: 'Xoá phân quyền',
        ManageMember: 'Quản lý thành viên',
        AddMembers: 'Thêm thành viên',
        ViewMemberList: 'Xem danh sách thành viên',
        MemberUpdate: 'Cập nhật thành viên',
        RemoveMember: 'Xóa thành viên',
        Application: 'Ứng dụng',
        assign: 'Giao việc',
        ManagingHuman: 'Quản lý con người',
        FinancialManagement: 'Quản lý tài chính',
        UpdateRoleGroup: 'Sửa nhóm quyền',
        ApplicationDetails: 'Chi tiết ứng dụng',
        FavoriteApps: 'Ứng dụng yêu thích',
        interface: 'Giao diện',
        LightMode: 'Chế độ sáng',
        DarkMode: 'Chế độ tối',
        company: 'Công ty',
        //phần
        Save: 'Lưu',
        UploadFromExcel: 'Tải File Excel',
        Actions: 'Thao tác',
        editAccount: 'Chỉnh sửa tài khoản',
        edit: 'Chỉnh sửa',
        delete: 'Xóa',
        add: 'Thêm',
        downloadExcel: 'Tải Mẫu Excel',
        addSuccess: 'Thêm thành công',
        editSuccess: 'Chỉnh sửa thành công',
        deleteSuccess: 'Xóa thành công',
        deleteConfirmationMessage: 'Bạn có chắc muốn xóa?',
        deleteConfirmation: 'Xác nhận xóa',
        agree: 'Đồng ý',
        version: 'Phiên bản',
        numericalOrder: 'STT',
        editReleaseNote: 'Chỉnh sửa Lịch Sử Phát Hành',
        addReleaseNote: 'Thêm Lịch Sử Phát Hành',
        releaseNote: 'Lịch Sử Phát Hành',
        notNull: ' không được bỏ trống',
        shouldNotExceed: ' không được vượt quá ',
        character: 'ký tự',
        customer: 'Khách hàng',
    },
    en: {
        male: 'Male',
        female: 'Female',
        // left menu
        app: 'Application',
        personal: 'Personal',
        member: 'Member',
        config: 'Config',
        search: 'search...',
        hi: 'Hi ',
        good: 'Wishing you a productive day!',
        // profile
        profile: 'Profile',
        password: 'Password',
        image: 'Image',
        email: 'Email',
        DOB: 'Date of birth',
        username: 'Full Name',
        gender: 'Gender',
        phone: 'Phone number',
        newPassword: 'New Password',
        confirmPassword: 'Confirm Password',
        selectImage: 'Select Image',
        currentAvatar: 'Current Avatar',
        selectFile: 'Select File',
        submit: 'Submit',
        successful: 'Successful',
        // member page
        user: 'Username',
        createdAt: 'CreatedAt',
        action: 'Action',
        moreMembers: 'Add members',
        findMembers: 'Find members',
        general: 'General',
        // login
        EnterYourDetailsBelow: 'Enter your details below.',
        rememberMe: 'Remember me',
        dontHaveAnAccount: 'Dont Have An Account ?',
        signUp: 'Sign up',
        signIn: 'Sign In',
        forgotPassword: 'forgot password',
        signInToERPOryza: 'Sign in to ERP Oryza',
        createYourAccount: 'Create your Account',
        iAgreeToTheTerm: 'I Agree To The Term & Conditions',
        createMyAccount: 'Create My Account',
        alreadyHaveAnAccount: 'Already have an account?',
        forgotPasswordDescription:
            'please enter your registered email address. We will send instructions to help reset your password',
        sendRequestIntructions: 'Send Request Intructions',
        loggedInSuccessfully: 'Logged in successfully',
        wrongEmailOrƠassword: 'Wrong Email Or Password',
        passwordincorrect: 'Password incorrect',
        signUpSuccess: 'Registration Success',
        registrationFailed: 'Registration failed',
        createAccount: 'Create Account',
        uploadFromExcelFile: 'Create Account from Excel file',
        // create account
        youHaveNotEnteredEmail: 'You Have Not Entered Email',
        invalidEmail: 'Invalid email. eExample(example@oryza.vn)',
        YouDidNotEnterAphoneNumber: 'You did not enter a phone number',
        invalidPhoneNumber: 'Invalid phone number',
        youHaveNotEnteredPassword: 'You Have Not Entered Password',
        thePasswordIsTooShort: 'the password is too short',
        cancel: 'Cancel',
        validate: 'Please check your information before creating an account',
        setting: 'Setting',
        loginManagement: ' Login Management',
        loginDevices: 'Login Devices',
        logout: 'Logout',
        CommonlyUsedApplications: 'Commonly Used Applications',
        role: 'Role',
        validateUserName: "You haven't entered your name yet",
        roleName: 'Role name',
        description: 'Description',
        addRoleGroup: 'Add Role Group',
        RoleGroupName: 'Role Group Name',
        keyshort: 'Keyshort',
        generalManagementRights: 'General management rights',
        FullSystemAuthority: 'Full system authority',
        DecentralizedAdministration: 'Decentralized Administration',
        ReadPermissions: 'Read Permissions',
        CreatePermissions: 'Create Permissions',
        UpdatePermissions: 'Update Permissions',
        DeletePermissions: 'Delete Permissions',
        ManageMember: 'Manage member',
        AddMembers: 'Add members',
        ViewMemberList: 'View member list',
        MemberUpdate: 'Member update',
        RemoveMember: 'Remove member',
        Application: 'Application',
        assign: 'assign',
        ManagingHuman: 'Managing human',
        FinancialManagement: 'Financial management',
        UpdateRoleGroup: 'Update Role Group',
        ApplicationDetails: 'Application details',
        FavoriteApps: 'favorite apps',
        interface: 'Interface',
        LightMode: 'Light Mode',
        DarkMode: 'Dark Mode',
        company: 'Company',
        //Phần
        Save: 'Save',
        UploadFromExcel: 'Upload Excel File',
        Actions: 'Actions',
        editAccount: 'Edit User',
        edit: 'Edit',
        delete: 'Delete',
        add: 'Add',
        downloadExcel: 'Download Excel',
        addSuccess: 'Add Success',
        editSuccess: 'Edit Success',
        deleteSuccess: 'Delete Success',
        deleteConfirmationMessage: 'Are you sure you want to delete?',
        deleteConfirmation: 'Delete Confirmation',
        agree: 'Agree',
        version: 'Version',
        numericalOrder: 'N.O',
        editReleaseNote: 'Edit Release Note',
        addReleaseNote: 'Add Release Note',
        releaseNote: 'Release Note',
        notNull: ' not empty',
        shouldNotExceed: ' should not exceed ',
        character: 'characters',
        customer: 'Customer',
    },
};
