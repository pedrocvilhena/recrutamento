import "reflect-metadata";
import {
  createHandler, Get, Post, Patch, Delete, Body, Param,
  HttpCode, NotFoundException, ParseNumberPipe, ValidationPipe,
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

class TodosHandler {
  @Get()
  list() {
    return prisma.todo.findMany({ orderBy: { id: "asc" } });
  }

  @Get("/:id")
  async getOne(@Param("id", ParseNumberPipe) id: number) {
    const todo = await prisma.todo.findUnique({ where: { id } });
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
    @Param("id", ParseNumberPipe) id: number,
    @Body(ValidationPipe) body: UpdateTodoDto
  ) {
    const exists = await prisma.todo.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException("Todo not found");
    return prisma.todo.update({
      where: { id },
      data: { title: body.title, completed: body.completed },
    });
  }

  @Delete("/:id")
  @HttpCode(204)
  async remove(@Param("id", ParseNumberPipe) id: number) {
    const exists = await prisma.todo.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException("Todo not found");
    await prisma.todo.delete({ where: { id } });
  }
}

export default createHandler(TodosHandler);