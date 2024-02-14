tutorial:
    https://www.youtube.com/watch?v=LaMoteg626I&list=WL&index=1&t=21s

+ create app
  + npx create-next-app@latest
  + answer yes to everything
+ create one home page and one secure page
+ install prisma
  $> npm install prisma --save-dev
  $> npx prisma init --datasource-provider sqlite
+ configure prisma with next.js
  + https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices#solution
    + copy code of "db.ts" to create a singleton connection
  + create file
    + copy code inside new file "src/lib/prisma.ts"
  + there is an error because we didn't generate prisma client yet
+ next auth:
  + doc https://authjs.dev/reference/adapter/prisma
  + install prisma adapter
    + $> npm install @prisma/client @auth/prisma-adapter
  + install next-auth
    + $> npm install next-auth
  + CAUTION: he doesn't know how to do it with app, so he does it with pages! (but i will fix this later)
    + create file outside src/ "pages/api/auth/[...nextauth.ts]"
      + code inside... copy from youtube... see file
    + copy code from https://authjs.dev/reference/adapter/prisma#create-the-prisma-schema-from-scratch
      + into prisma/schema.prisma
      + delete @db.Text
  + $> npx prisma migrate dev
+ add OAuth
  + https://authjs.dev/getting-started/providers/oauth-tutorial#1-configuring-authjs
  + add github provider first:
    + in file "[...nextautg].ts", add "import GithubProvider from "next-auth/providers/github";"
    + add GithubProvider with id and secret from github
+ get github id and secret:
  + go to github.com > settings > Developer settings > OAuth Apps > register new OAuth application
    + follow https://authjs.dev/getting-started/providers/oauth-tutorial#2-configuring-oauth-provider
      + homepage url: http://localhost:3000
      + Authorization callback URL: http://localhost:3000/api/auth/callback/github
      + click button Register application
    + get client id and client secret from there
    + put them in .env
    + .gitignore > .env
+ program stuff...
+ google OAuth 
  + https://developers.google.com/identity/protocols/oauth2
    + cliquer sur "Google API console"
      + create new project > select project > OAuth consent screen
        + External
        + don't upload a logo (buggy)
        + all params = http://localhost:3000
          + except domain name put anything
        + Don't select scopes, select "save and continue"
        + next ... next ... publish app
        + Ensuite quand c'est fini, choisir le menu "Credentials" > create credentials > OAuth client ID
          + web app
          + authorized javascript origins: http://localhost:3000
          + authorized redirect URIs: http://localhost:3000/api/auth/callback/google
          + click CREATE
          + on récupère client id et client secret
  + add simple provider GoogleProvider() to "[...nextauth].ts"
+ email auth:
  + https://authjs.dev/getting-started/providers/email-tutorial
  + it's a one time session by email link, i have not programmed it, and i don't have any test smtp to use

+ generate nextauth secret:
  + $> Q9MiGA26H1zIKF70PX14qOWlMrQqv2fF12Go7R+JyKE=
  + put this in .env: NEXTAUTH_SECRET="Q9MiGA26H1zIKF70PX14qOWlMrQqv2fF12Go7R+JyKE="
  + add secret in NextAuth({})
