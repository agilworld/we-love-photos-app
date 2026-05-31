# We Love Photos

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.5.0-brightgreen.svg)
![Node](https://img.shields.io/badge/node-%3E%3D20.0.0-green.svg)
![pnpm](https://img.shields.io/badge/pnpm-9.15.0-red.svg)

> A photo search and AI background removal platform built with Next.js, Zustand, Transformers.js and ONNX runtime web model.

## About

We Love Photos helps you discover beautiful photos from a source (Pexel) and remove backgrounds using transformer.js acts as machine learning model runs on b your browser. The web app serves as a frontend client, run transformer.js under onnxruntime-web, Javascript library for running ONNX models on browsers or on Node.js uses WebGL or WebGPU

## Purpose

The repository has two purposes, namely for front-end developers as a testing material for handling large data searches from the source provider Pexel and secondly for end-users as a good resource for finding Hi-Res photos that can be downloaded and removed from the background using transformer.js library.

## About Removal Background

### What does Transformer.js actually?

Transformers.js is a JavaScript library that allows you to run state-of-the-art Machine Learning models directly in your browser or on Node.js, without needing a Python backend.

> [ Your Browser (Transformers.js) ] ---> Runs Model Locally using ONNX Runtime ---> Output

**ONNX Runtime**: Transformers.js converts Python-based models (PyTorch/TensorFlow) into a universal format called ONNX (Open Neural Network Exchange).

Hardware Acceleration: It uses WebGL or WebGPU inside the browser (and ONNX Runtime in Node.js) to compile and run these models using the user's local graphics card (GPU) or processor (CPU).

No Server Required: The model weights are downloaded directly to the user's browser cache and executed right there.

## Getting Started

### Prerequisites

- Node.js >= 20.0.0
- pnpm >= 9.15.0 (install: `npm install -g pnpm`)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd we-love-photos-app

# Install all workspace dependencies
pnpm install
```

Open [http://localhost:3010](http://localhost:3010) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Environment Variables

Create a `.env` file in the project root (see `.env` for reference). The following variables are required:

| Variable                          | Description           | Example / Source                                                        |
| --------------------------------- | --------------------- | ----------------------------------------------------------------------- |
| `NEXT_PUBLIC_UNSPLASH_BASE_API`   | Unsplash API base URL | `https://api.unsplash.com`                                              |
| `NEXT_PUBLIC_UNSPLASH_CLIENT_KEY` | Unsplash access key   | Get yours at [unsplash.com/developers](https://unsplash.com/developers) |
| `NEXT_PUBLIC_PEXEL_BASE_API`      | Pexels API base URL   | `https://api.pexels.com/v1/`                                            |
| `NEXT_PUBLIC_PEXEL_CLIENT_KEY`    | Pexels API key        | Get yours at [pexels.com/api](https://www.pexels.com/api/)              |
| `NEXT_PUBLIC_API_BASE_URL`        | Local API base URL    | `http://localhost:3010`                                                 |
| `NEXT_PUBLIC_SENTRY_DSN`          | Sentry API key        | Get yours at [sentry.io](https://www.sentry.io/)                        |

## Contributing

Contributions are welcome! Whether it's fixing a bug, proposing a feature, or improving the UI — we'd love your help.

**Quick steps:**

1. Read [CONTRIBUTING.md](CONTRIBUTING.md) for bug vs. feature rules
2. Fork the repo via the **Fork** button
3. Clone your fork locally
4. Create a branch: `git checkout -b dev/your-branch`
5. Ensure `pnpm lint` passes
6. Open a Pull Request

For detailed guidelines, see [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE) © Dian Afrial Rahadi Ragil

---

## Acknowledgments

- Photo data from [Pexel](https://www.pexels.com/) and [Unsplash](https://unsplash.com/)
- Background removal powered by [@huggingface/transformers.js](https://huggingface.co/docs/transformers.js)
- Icons by [Lucide](https://lucide.dev/)
- UI components from [Shadcn/UI](https://ui.shadcn.com/)

---

**Built with ❤️ for photo lovers everywhere**
