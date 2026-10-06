import "reflect-metadata";
   import {
     createHandler, Get, Post, Patch, Delete, Body, Param,
     HttpCode, NotFoundException, BadRequestException, ValidationPipe,
   } from "next-api-decorators";
   import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";
   import { prisma } from "../../../lib/prisma";

   class CreateTodoDto {
     @IsString()
     @IsNotEmpty()
     title!: string;
   }

   class UpdateTodoDto {
     @IsOptional()
     @IsString()
     @IsNotEmpty()
     title?: string;

     @IsOptional()
     @IsBoolean()
     completed?: boolean;
   }

   function toId(raw: string): number {
     const id = Number(raw);
     if (!Number.isInteger(id)) throw new BadRequestException("Invalid id");
     return id;
   }

   class TodosHandler {
     @Get()
     list() {
       return prisma.todo.findMany({ orderBy: { id: "asc" } });
     }

     @Get("/:id")
     async getOne(@Param("id") rawId: string) {
       const todo = await prisma.todo.findUnique({ where: { id: toId(rawId) } });
       if (!todo) throw new NotFoundException("Todo not found");
       return todo;
     }

     @Post()
     @HttpCode(201)
     create(@Body(ValidationPipe) body: CreateTodoDto) {
       return prisma.todo.create({ data: { title: body.title } });
     }

     @Patch("/:id")
     async update(
       @Param("id") rawId: string,
       @Body(ValidationPipe) body: UpdateTodoDto
     ) {
       const id = toId(rawId);
       const exists = await prisma.todo.findUnique({ where: { id } });
       if (!exists) throw new NotFoundException("Todo not found");
       return prisma.todo.update({
         where: { id },
         data: { title: body.title, completed: body.completed },
       });
     }

     @Delete("/:id")
     @HttpCode(204)
     async remove(@Param("id") rawId: string) {
       const id = toId(rawId);
       const exists = await prisma.todo.findUnique({ where: { id } });
       if (!exists) throw new NotFoundException("Todo not found");
       await prisma.todo.delete({ where: { id } });
     }
   }

   export default createHandler(TodosHandler);