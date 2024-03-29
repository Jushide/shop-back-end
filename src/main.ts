import { NestFactory, Reflector } from "@nestjs/core"
import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common"
import { AppModule } from "./app.module"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        bodyParser: false,
        //cors: true
    })

    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
        }),
    )

    const config = new DocumentBuilder().setTitle("Shop API").setVersion("v0.1").build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup("api", app, document)

    await app.listen(3000)
}
bootstrap()
