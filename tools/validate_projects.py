#!/usr/bin/env python3
"""
Validador estructurado para projects.json.

Propósito:
    Validar la estructura mínima del archivo de proyectos usado por la landing
    de GitHub Pages.

Características de programación estructurada:
    - Modularización mediante funciones.
    - Secuencia clara de ejecución.
    - Selección con if/elif/else.
    - Iteración para recorrer proyectos, campos y listas.
    - Manejo de excepciones con try/except.
    - Bitácora de eventos con logging.
    - Reporte claro en consola.
    - Docstrings completos.
"""

from __future__ import annotations

import argparse
import json
import logging
from pathlib import Path
from typing import Any


REQUIRED_STRING_FIELDS: list[str] = [
    "id",
    "title",
    "category",
    "status",
    "summary",
    "description",
    "purpose",
    "architectureImage",
    "date",
]

REQUIRED_LIST_FIELDS: list[str] = ["features", "techStack"]


def configure_logging() -> None:
    """
    Configura la bitácora del validador.

    Returns:
        None.
    """
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s | %(levelname)s | %(message)s",
    )


def parse_arguments() -> argparse.Namespace:
    """
    Procesa argumentos de línea de comandos.

    Returns:
        argparse.Namespace con la ruta del archivo JSON.
    """
    parser = argparse.ArgumentParser(
        description="Validar la estructura de projects.json para la landing de GitHub Pages."
    )
    parser.add_argument(
        "--file",
        type=Path,
        default=Path("projects.json"),
        help="Ruta del archivo projects.json a validar.",
    )
    return parser.parse_args()


def load_json(path: Path) -> list[dict[str, Any]]:
    """
    Carga y parsea el archivo JSON de proyectos.

    Args:
        path: Ruta del archivo JSON.

    Returns:
        Lista de proyectos como diccionarios.

    Raises:
        FileNotFoundError: Si el archivo no existe.
        ValueError: Si el JSON no contiene una lista.
        json.JSONDecodeError: Si el archivo tiene sintaxis JSON inválida.
    """
    if not path.exists():
        raise FileNotFoundError(f"No existe el archivo: {path}")

    with path.open("r", encoding="utf-8") as file:
        data: Any = json.load(file)

    if not isinstance(data, list):
        raise ValueError("El archivo debe contener una lista de proyectos.")

    projects: list[dict[str, Any]] = []
    for index, item in enumerate(data):
        if not isinstance(item, dict):
            raise ValueError(f"El elemento {index} debe ser un objeto JSON.")
        projects.append(item)

    return projects


def validate_string_field(project: dict[str, Any], field: str, index: int) -> None:
    """
    Valida un campo obligatorio de tipo string.

    Args:
        project: Proyecto individual.
        field: Nombre del campo a validar.
        index: Posición del proyecto en la lista.

    Returns:
        None.

    Raises:
        ValueError: Si el campo no existe o no es texto no vacío.
    """
    value = project.get(field)

    if not isinstance(value, str) or value.strip() == "":
        raise ValueError(f"Proyecto {index}: campo requerido inválido o vacío: {field}")


def validate_list_field(project: dict[str, Any], field: str, index: int) -> None:
    """
    Valida un campo obligatorio de tipo lista de textos.

    Args:
        project: Proyecto individual.
        field: Nombre del campo a validar.
        index: Posición del proyecto en la lista.

    Returns:
        None.

    Raises:
        ValueError: Si el campo no existe, no es lista o contiene valores no textuales.
    """
    value = project.get(field)

    if not isinstance(value, list) or len(value) == 0:
        raise ValueError(f"Proyecto {index}: campo requerido debe ser lista no vacía: {field}")

    for item_index, item in enumerate(value):
        if not isinstance(item, str) or item.strip() == "":
            raise ValueError(
                f"Proyecto {index}: {field}[{item_index}] debe ser texto no vacío."
            )


def validate_unique_ids(projects: list[dict[str, Any]]) -> None:
    """
    Valida que los IDs de proyecto sean únicos.

    Args:
        projects: Lista de proyectos.

    Returns:
        None.

    Raises:
        ValueError: Si se detecta un ID duplicado.
    """
    seen: set[str] = set()

    for project in projects:
        project_id = str(project.get("id", ""))

        if project_id in seen:
            raise ValueError(f"ID duplicado detectado: {project_id}")

        seen.add(project_id)


def validate_projects(projects: list[dict[str, Any]]) -> bool:
    """
    Valida la estructura completa del archivo de proyectos.

    Args:
        projects: Lista de proyectos.

    Returns:
        True si la validación es exitosa.

    Raises:
        ValueError: Si algún proyecto incumple la estructura mínima.
    """
    if len(projects) == 0:
        raise ValueError("La lista de proyectos está vacía.")

    validate_unique_ids(projects)

    for index, project in enumerate(projects):
        for field in REQUIRED_STRING_FIELDS:
            validate_string_field(project, field, index)

        for field in REQUIRED_LIST_FIELDS:
            validate_list_field(project, field, index)

    return True


def print_report(projects: list[dict[str, Any]]) -> None:
    """
    Imprime un reporte claro de validación en consola.

    Args:
        projects: Lista de proyectos validados.

    Returns:
        None.
    """
    print("\nREPORTE DE VALIDACIÓN")
    print("=" * 60)
    print(f"Total de proyectos validados: {len(projects)}")
    print("-" * 60)

    for index, project in enumerate(projects, start=1):
        print(f"{index}. {project['title']} | {project['category']} | {project['status']}")

    print("=" * 60)
    print("Resultado: projects.json es válido.\n")


def main() -> None:
    """
    Coordina la ejecución del validador.

    Secuencia:
        1. Configura logging.
        2. Lee argumentos.
        3. Carga JSON.
        4. Valida estructura.
        5. Imprime reporte.

    Returns:
        None.
    """
    configure_logging()
    args = parse_arguments()

    try:
        logging.info("Iniciando validación: %s", args.file)
        projects = load_json(args.file)

        if validate_projects(projects):
            print_report(projects)

        logging.info("Validación completada correctamente.")

    except FileNotFoundError as error:
        logging.error("Archivo no encontrado: %s", error)
        print(f"Error: {error}")

    except json.JSONDecodeError as error:
        logging.error("JSON inválido: %s", error)
        print(f"Error: sintaxis JSON inválida en línea {error.lineno}, columna {error.colno}.")

    except ValueError as error:
        logging.error("Validación fallida: %s", error)
        print(f"Error de validación: {error}")

    except Exception as error:
        logging.exception("Error inesperado: %s", error)
        print("Error inesperado durante la validación. Revisa la bitácora en consola.")


if __name__ == "__main__":
    main()
