# Automated Handwriting Replication System - Sulekhak

**February - May, 2025**

## Overview

This project, named **Sulekhak** (literary meaning: good writer), is a groundbreaking system that utilizes mechanical innovation to redefine handwriting for modern needs. It consists of a two-part solution: **Software** and **Hardware**, working together to physically reproduce text in a personalized handwriting style.

## Challenge

People face various challenges with handwritten tasks, which this system aims to solve:

- **Time-Consuming Reports:** Students spend significant time manually writing lab reports.
- **Maintaining Personal Style:** Individuals with disabilities (such as Parkinson's disease) struggle to maintain their unique personal writing style.
- **Precision Replication:** Historians require the precise replication of ancient manuscripts.
- **Manual Document Completion:** Clerks must complete numerous government documents by hand.

## Solution

The system blends artistry with technology to make handwriting accessible, meaningful, and transformative.

### Software Component

The software creates a personalized font from a user's handwriting sample and generates precise instructions for the hardware.

- **Handwriting to Font:** It converts an input image of a handwritten phrase into a personalized font that mimics the user's style.
- **Workflow:**
  1.  The user provides an input image.
  2.  Using the OpenCV library, characters are cropped from the image.
  3.  All character images are renamed and converted into the **SVG** format.
  4.  The SVGs are compiled into a font file.
- **Future Aspirations:** Key improvements aimed for include:
  - **Ligature Customization:** Adding support for natural letter combinations (e.g., "fi," "fl") to make the handwriting fonts more realistic.
  - **SVG Smoothening:** Refining jagged edges in glyphs for cleaner, more professional-looking fonts.

### Hardware Component

The hardware is a writing mechanism that physically reproduces the handwritten text on paper or other surfaces.

- **Writing Mechanism:** It holds a pen and performs precise movements based on the software's instructions.
- **Mechanical Design:** The machine body's 3D model ensures precision and functionality.
  - A **rack and pinion mechanism** is used along with **stepper motors** for precise positioning along the X and Y axes.
- **Power System:** The aim is to have continuous stable power.
  - The system uses an **SMPS** (Switched-Mode Power Supply) instead of batteries due to high power requirements.
  - Two **buck converters** are used to efficiently step down the 12V supply to 5V and 3.3V for the micro-controllers and servos.
  - The 12V supply powers the stepper motors and stepper drivers.

## Technical Specifications

The system is defined by its two main components:

| Component    | Function                                                                                      |
| :----------- | :-------------------------------------------------------------------------------------------- |
| **Software** | Converts a handwritten sample into a personalized font and generates instructions.            |
| **Hardware** | A physical device with a writing mechanism that uses precise movements to reproduce the text. |

## Tools & Technologies

The project involves mechanical design, software development, and control systems:

- **Software:** OpenCV library for character cropping.
- **Mechanical/CAD:** 3D model crafting.
- **Actuation & Control:** Stepper motors, rack and pinion mechanism.
- **Power Systems:** SMPS, buck converters.

## My role

My contributions focus entirely on the Software Development aspect of the Sulekhak project. My primary role is to lead the creation of a personalized font from the user's handwriting sample. The workflow involves first taking the input image of the handwritten phrase. Then, using the OpenCV library, I implement the logic to crop the individual characters from that image. Once cropped, I rename all character images and convert them into the SVG format. Finally, I compile these SVGs into a functioning font file. Beyond font creation, my software generates the precise instructions that are then sent to the hardware's actuation system for physical execution. I am currently working on key enhancements like adding support for natural ligatures (e.g., "fi," "fl") and implementing SVG Smoothening to refine jagged glyph edges, aiming for a more realistic and professional final product.

## Gallery

## Pitch presentation

Refer to this file: [Sulekhak_Pitch_Deck.pdf](\02_Sulekhak\res\Sulekhak.pdf)
