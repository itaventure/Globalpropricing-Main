// Admin Panel JavaScript
class AdminPanel {
    constructor() {
        this.users = [];
        this.loadUsers();
    }

    // Users load karna
    loadUsers() {
        const savedUsers = localStorage.getItem('globalpropricing_admin_users');
        if (savedUsers) {
            this.users = JSON.parse(savedUsers);
        }
        this.renderDashboard();
        this.renderUsers();
    }

    // Users save karna
    saveUsers() {
        localStorage.setItem('globalpropricing_admin_users', JSON.stringify(this.users));
    }

    // Dashboard update karna
    renderDashboard() {
        const totalUsers = this.users.length;
        const activeUsers = this.users.filter(user => user.status === 'active').length;
        const pendingUsers = this.users.filter(user => user.status === 'pending').length;
        const totalRevenue = this.users.filter(user => user.status === 'active').length * 10;

        document.getElementById('totalUsers').textContent = totalUsers;
        document.getElementById('activeUsers').textContent = activeUsers;
        document.getElementById('pendingUsers').textContent = pendingUsers;
        document.getElementById('totalRevenue').textContent = '$' + totalRevenue;
    }

    // Users list show karna
    renderUsers() {
        const usersList = document.getElementById('usersList');
        
        if (this.users.length === 0) {
            usersList.innerHTML = '<p>No users found.</p>';
            return;
        }

        usersList.innerHTML = this.users.map(user => `
            <div class="user-card ${user.status}">
                <h4>📧 ${user.email}</h4>
                <p><strong>Plan:</strong> ${user.plan} | <strong>Status:</strong> 
                <span class="status-${user.status}">${user.status.toUpperCase()}</span></p>
                <p><strong>Joined:</strong> ${new Date(user.joinDate).toLocaleDateString()}</p>
                
                ${user.status === 'pending' ? 
                    `<button class="btn btn-activate" onclick="admin.activateUser('${user.email}')">
                        ✅ Activate
                    </button>` : 
                    `<button class="btn btn-deactivate" onclick="admin.deactivateUser('${user.email}')">
                        ❌ Deactivate
                    </button>`
                }
                
                <button class="btn" onclick="admin.deleteUser('${user.email}')">
                    🗑️ Delete
                </button>
            </div>
        `).join('');
    }

    // New user add karna
    addUser(email, plan = 'monthly') {
        const existingUser = this.users.find(user => user.email === email);
        if (existingUser) {
            alert('User already exists!');
            return;
        }

        const newUser = {
            email: email,
            plan: plan,
            status: 'pending',
            joinDate: new Date().toISOString(),
            paymentDate: null
        };

        this.users.push(newUser);
        this.saveUsers();
        this.renderDashboard();
        this.renderUsers();
        
        alert(`User ${email} added successfully!`);
    }

    // User activate karna
    activateUser(email) {
        const user = this.users.find(user => user.email === email);
        if (user) {
            user.status = 'active';
            user.paymentDate = new Date().toISOString();
            this.saveUsers();
            this.renderDashboard();
            this.renderUsers();
            alert(`User ${email} activated successfully!`);
        }
    }

    // User deactivate karna
    deactivateUser(email) {
        const user = this.users.find(user => user.email === email);
        if (user) {
            user.status = 'inactive';
            this.saveUsers();
            this.renderDashboard();
            this.renderUsers();
            alert(`User ${email} deactivated!`);
        }
    }

    // User delete karna
    deleteUser(email) {
        if (confirm(`Are you sure you want to delete ${email}?`)) {
            this.users = this.users.filter(user => user.email !== email);
            this.saveUsers();
            this.renderDashboard();
            this.renderUsers();
            alert(`User ${email} deleted!`);
        }
    }
}

// Global admin instance
const admin = new AdminPanel();

// Section change karna
function showSection(sectionName) {
    // Sab sections hide karna
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Sab buttons se active class remove karna
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Selected section show karna
    document.getElementById(sectionName).classList.add('active');
    
    // Button ko active karna
    event.currentTarget.classList.add('active');
}

// Manual user add karna
function addManualUser() {
    const email = document.getElementById('manualEmail').value;
    const plan = document.getElementById('manualPlan').value;
    
    if (!email) {
        alert('Please enter email address');
        return;
    }
    
    admin.addUser(email, plan);
    document.getElementById('manualEmail').value = '';
}

// Sample data - pehle se kuch users add karna
function addSampleData() {
    if (admin.users.length === 0) {
        admin.addUser('customer1@gmail.com', 'monthly');
        admin.addUser('customer2@gmail.com', 'yearly');
        admin.activateUser('customer1@gmail.com');
    }
}

// Page load pe sample data add karna
document.addEventListener('DOMContentLoaded', function() {
    addSampleData();
});