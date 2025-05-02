const commands = {
    help: {
        description: 'List available commands',
        execute: () => [
            '┌───────────── Available Commands ─────────────┐',
            '│                                              │',
            '│   about      Display information about me    │',
            '│   projects   Show my projects                │',
            '│   skills     List technical skills           │',
            '│   education  Show educational background     │',
            '│   experience Display work experience         │',
            '│   contact    Get contact information         │',
            '│   clear      Clear the terminal              │',
            '│                                              │',
            '└──────────────────────────────────────────────┘'
        ]
    },
    experience: {
        description: 'Display work experience',
        execute: () => [
            '┌────────────── Work Experience ────────────────┐',
            '│ HackOnHills 6.0 | Organizer (April 2025)      │',
            '│ - Organized 3-day national level hackathon    │',
            '│ - Coordinated sponsors & managed logistics    │',
            '│ - Led team of 53 members                      │',
            '│ - Managed 1000+ participants                  │',
            '│                                               │',
            '│ App Team | Coordinator (Jan 2023-Present)     │',
            '│ - Led mobile app development for college fests│',
            '│ - Oversaw team of 50+ members                 │',
            '│ - Achieved 500+ downloads per app             │',
            '└───────────────────────────────────────────────┘'
        ]
    },
    about: {
        execute: () => [
            '┌─────────────── About Sankalp ───────────────┐',
            '│                                             │',
            '│ Backend Developer | DevOps Engineer         │',
            '│ Tech enthusiast | Network Engineer          │',
            '│ Passionate about open-source contributions  │',
            '│                                             │',
            '└─────────────────────────────────────────────┘'
        ]
    },
    projects: {
        execute: () => [
            '┌────────────── Notable Projects ─────────────┐',
            '│ Bind-DNS:                                   │',
            '│ - Build DNS server                          │',
            '│ - 99.9% uptime using AWS & Docker           │',
            '│                                             │',
            '│ Hill-ffair 2K24:                            │',
            '│ - Flutter/Firebase real-time updates system │',
            '│ - Managed 3000+ confessions infrastructure  │',
            '│ - 40% engagement boost                      │',
            '│                                             │',
            '│ Nimbus 2K24:                                │',
            '│ - College fest app with 1000+ installs      │',
            '│ - Maintained 800+ active users              │',
            '└─────────────────────────────────────────────┘'
        ]
    },
    skills: {
        execute: () => [
            '┌────────────── Technical Skills ─────────────┐',
            '│ Languages: C/C++, Python, Go, JavaScript    │',
            '│ Frameworks: React, Django-RF, Gin, GORM     │',
            '│ Databases: MySQL, Redis, PostgreSQL         │',
            '│ Cloud: AWS, GCP, DigitalOcean, Firebase     │',
            '│ Tools: VS Code, Git, Docker, Postman        │',
            '│ Libraries: Pandas, NumPy, Matplotlib        │',
            '└─────────────────────────────────────────────┘'
        ]
    },
    education: {
        execute: () => [
            '┌────────────── Education ────────────────────┐',
            '│ NIT Hamirpur | BTech+MTech CSE (Dual Degree)│',
            '│ Relevant Coursework:                        │',
            '│ - Data Structures & Algorithms              │',
            '│ - Operating Systems                         │',
            '│ - Database Management Systems               │',
            '│ - OOPs                                      │',
            '│ - Computer Networks                         │',
            '└─────────────────────────────────────────────┘'
        ]
    },
    contact: {
        execute: () => [
            '┌────────────── Contact Info ─────────────────┐',
            '│ Email: sankalpgupta2102@gmail.com           │',
            '│ GitHub:   github.com/sankalp2102            │',
            '│ LinkedIn: linkedin.com/in/sankalp-gupta     │',
            '└─────────────────────────────────────────────┘'
        ]
    },
    clear: {
        execute: () => ['__CLEAR__']
    }
};

const terminalBody = document.querySelector('.terminal-body');
const inputField = document.getElementById('input');
const initialOutput = document.querySelector('.output');
let commandHistory = [];
let historyIndex = -1;

function processCommand(command) {
    commandHistory.push(command);
    historyIndex = -1;

    // Create command element (user input)
    const commandElement = document.createElement('div');
    commandElement.className = 'command';
    commandElement.textContent = `$ ${command}`;
    terminalBody.insertBefore(commandElement, inputField.parentElement);

    const cmd = command.toLowerCase().trim();
    const response = commands[cmd]?.execute() || [
        `Command not found: ${cmd}`,
        'Type "help" for available commands'
    ];

    // Handle clear command
    if (response[0] === '__CLEAR__') {
        // Remove all commands, responses, and errors except initial output
        const elementsToRemove = document.querySelectorAll(
            '.command, .response:not(.initial), .error'
        );
        elementsToRemove.forEach(element => element.remove());
        
        // Reset scroll position
        terminalBody.scrollTop = 0;
        inputField.value = '';
        return;
    }

    // Create response elements (system output)
    response.forEach(line => {
        const responseElement = document.createElement('div');
        responseElement.className = line.startsWith('Command not found') ? 'error' : 'response';
        responseElement.textContent = line;
        terminalBody.insertBefore(responseElement, inputField.parentElement);
    });

    inputField.value = '';
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

inputField.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        processCommand(inputField.value);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
            historyIndex++;
            inputField.value = commandHistory[commandHistory.length - 1 - historyIndex];
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            inputField.value = commandHistory[commandHistory.length - 1 - historyIndex];
        } else {
            historyIndex = -1;
            inputField.value = '';
        }
    }
});

terminalBody.addEventListener('click', () => {
    inputField.focus();
});

// Mark initial messages as permanent
document.querySelectorAll('.response').forEach(el => el.classList.add('initial'));