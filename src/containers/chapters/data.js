export const chapters_data = [
    {
        title: {
            text: 'OBJECTIVES',
            img: '/img/secrets-mgmt/Ellips.svg',
            subTitle: 'This theory lab has two main objectives.',
        },
        info_container: [
            {
                title: ' Understanding Secret Management Concepts',
                text: 'First of all, we will familiarize you with the various secrets management concepts and best practices. It should            be evident to you what secrets management means for scaling the DevOps productivity within the team.',
            },
            {
                title: ' Preparing for hands-on implementation',
                text: ' By completing this theory lab, we will prepare you for a hands-on implementation of  secrets management concepts. After working through the content, you will be able to apply your knowledge and effectively implement secrets management concepts, workflow, and the applicable tooling in your current working environment.',
            },
        ],
        warning_container: {
            title: 'Quiz and workflow',
            text: [' We will quiz you to test your understanding of the concepts presented in this lab and ensure that you are ready for the hands-on labs. Take your time! The theory module allows you to complete the steps, pause, and resume,as many times as you want.'],
        },
    },

    {
        title: {
            text: 'What is the benefit of secrets management for your SDLC ?',
            img: '/img/secrets-mgmt/Key.svg',
        },
        single_text: ['Secrets Management is about secure and tightly, centrally controlled access to - and distribution from - tokens, passwords, certificates,encryption keys and other sensitive data in your Software Development Lifecycle.'],

        infinity: {
            img: 'svg',
        },
        success_container: {
            title: 'Productivity and Scalability',
            text: ['A mature secrets management workflow mitigates many risks related to the degradation of secrets hygiene and subsequent data  leaks or continuity issues. Moreover, it automates many manual steps in secrets maintenance, allowing increased focus on the core DevOps team and its SDLC : code quality. By introducing this automation, the team has another opportunity to increase productivity.',
                ' On the enterprise level, the secrets management concept enables enhanced scalability by facilitating the extension of environment clusters, DevOps teams, and CI/CD pipelines.'],
        },

    },
    {
        title: {
            text: 'Secrets Management: Why Now ?',
            img: '/img/secrets-mgmt/Key.svg',
        },
        single_text: ['We see a fast moving shift from Static to highly Dynamic infrastructures.',
            'Many organisations are moving from Datacenters, with inherently high-trust networks and clear network perimeters,    to a cloud infrastructure, with potentially multiple clouds and private datacenters without a clear network perimeter.',
            'This escalates the need to shift from IP address enforced security to Identity enforced security.'],

        image: '/img/isometric.svg',

        grad_container: 'Static IP-based solutions don\'t scale in dynamic environments with frequently changing applications and machines. Secretsfor applications and systems need to be centralized and based on trusted sources of application and user identity.',
    },

    {
        title: {
            text: ' Secrets Management at Scale',

        },
        single_text: [' Here are a few ways enterprise transformations are affecting secrets management at scale:'],

        list_box: [
            '  Cloud native development & multi-cloud infrastructure leads to secrets proliferation. As teams develop cloud-native   applications, secrets to services for storage, compute, analytics, logging, and dozens of other services become important to share and manage. AWS has close to, if not more than, 100 services alone, all that need to be mediated      with secrets, including API keys, SSH keys, tokens, certificates, and configuration.',
            '  Machine identity  and machine-to-machine communication matters as much or more than user identity. In traditional enterprise architecture, human users were the key. Human identities were important to access documents, spreadsheets, email, and other        tools. Modern enterprises, however, often have tens of thousands of machine-based identities that need to be managed and        mediated via tokens, API keys, certificates, and other secrets. Automation and AI/ML will continue to shift landscapes from human user identity to machine-based identity.',
            '  DevOps processes & microservices based architecture  also leads to secrets proliferation. Teams undergoing DevOps transformations move fast and manage many different infrastructure environments and services for development, testing,integration, and deployment. Secrets management for DevOps environments is vital as part of the secure software development lifecycle',
            '  AI & data analytics  leads to lots of secrets to manage for these pipelines as well.',
            '  IoT, robotics, and embedded device  proliferation leads to secrets proliferation, due to the need to have encryption and certificates for each IoT endpoint',
            '  Blockchain projects  in the enterprise also lead to more private keys than typically are used in applications.There becomes a need for an “enterprise wallet” to manage all those private keys'],

    },
];
