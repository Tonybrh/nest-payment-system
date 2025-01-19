<p align="center">
    <a href="https://git.io/typing-svg">    
        <img src="https://readme-typing-svg.demolab.com?font=DynaPuff&size=32&pause=1000&width=460&lines=Nestjs+crypto+buying+system" alt=""/>
    </a>
</p>

> ## O projeto consiste em uma api que atualiza a cada minuto o preço do bitcoin em dólar no banco de dados e um usuário após se cadastrar e verificar seu email poderá comprar um bitcoin com o preço atualizado.

## Instalação

### Será necessário ter o docker instalado na máquina para subir o banco de dados postgres. Certifique-se também de criar um arquivo .env na raiz do projeto seguindo o .env.example
> ### Com o docker instalado rode o comando
<pre>
   sudo docker compose up -d
</pre>

### Isso irá subir o banco de dados postgres na porta 5432, em seguida rode o comando

<pre>
    npm i && npm run start:dev
</pre>

### Isso irá iniciar o servidor em modo de compilação ( O servidor irá reiniciar a cada mudança feita no projeto)

## Explicação do projeto
### A arquitetura do projeto foi sustentada em um DDD ( Domain Driven Design) separado por módulos dentro da aplicação, tendo como domínios principais o Usuário e a Carteira além de domínios compartilhados entre eles. 
```yml
src
├── app.controller.spec.ts
├── app.controller.ts
├── app.module.ts
├── app.service.ts
├── main.ts
└── modules
├── auth # Módulo de autenticação
│   ├── auth.guard.ts
│   └── constants
│       └── constants.ts
├── mailer
│   ├── application
│   │   └── controller # Camada de endpoints
│   ├── Domain
│   │   └── service # Abstração do Service
│   ├── infrastructure
│   │   └── service # Implementação do Service
│   ├── mailer.module.ts
│   └── tests
│       └── mailer.controller.spec.ts
├── user
│   ├── application
│   │   └── controller # Camada de endpoints
│   ├── domain
│   │   ├── dto
│   │   ├── repository # Abstração do Repository
│   │   └── service # Abstração do Service
│   ├── infrastructure
│   │   ├── repository # Implementação do Repository
│   │   └── service # Implementação do Service
│   ├── tests
│   │   └── user.controller.spec.ts
│   └── user.module.ts
└── wallet
├── application
│   └── controller # Camada de endpoints
├── domain
│   ├── dto
│   ├── repository # Abstração do Repository 
│   └── service # Abstração do Service
├── infrastructure
│   ├── repository # Implementação do Repository
│   └── service # Implementação do Service
├── tests
│   ├── btc.controller.spec.ts
│   └── wallet.controller.spec.ts
└── wallet.module.ts

```

## Rotas

### Para criar um novo usuário
> ### @Post ```/api/user/post```

### Para atualizar a carteira de um usuário
> ### @Put ```/api/wallet/update-balance```

### Para verificar o email do usuário
> ### @Get ```/api/user/verify-email/?token```

### Para comprar um bitcoin
> ### @Post ```/api/btc/buy```

## Importante !!
### Usuários não verificados tem acesso apenas ao endpoint de verificar email e de registro, a rota de verificar o email libera um access token para ser usado nas demais rotas.