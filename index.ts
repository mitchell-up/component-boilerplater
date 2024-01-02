import { Command } from 'commander'

function createComponent() {
    
}

const program = new Command()

program
    .argument('<componentName>', 'Component name')
    .action((componentName) => {
        console.log('생성하려는 컴포넌트', componentName);
    })

program.parse(process.argv)
