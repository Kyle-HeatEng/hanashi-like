import { writeFile } from 'fs/promises'
import { join } from 'path'
import { tmpdir } from 'os'

/**
 * Generate TTS audio using OpenAI's tts-1 model
 * Note: OpenAI TTS API requires OPENAI_API_KEY. OpenRouter does not support TTS endpoints.
 * @param text Japanese text to convert to speech
 * @returns Buffer containing MP3 audio data
 */
export async function generateTTSAudio(text: string): Promise<Buffer> {
  const openaiKey = process.env.OPENAI_API_KEY

  if (!openaiKey) {
    throw new Error(
      'OPENAI_API_KEY environment variable is required for TTS generation. ' +
        'Note: OpenRouter does not support TTS endpoints - you must use OpenAI API key directly.'
    )
  }

  const response = await fetch('https://api.openai.com/v1/audio/speech', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openaiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'tts-1',
      input: text,
      voice: 'alloy',
      response_format: 'mp3',
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`OpenAI TTS API error: ${response.status} ${response.statusText} - ${errorText}`)
  }

  const audioBuffer = await response.arrayBuffer()
  return Buffer.from(audioBuffer)
}

/**
 * Generate TTS audio and save to a temporary file
 * @param text Japanese text to convert to speech
 * @returns Path to the temporary MP3 file
 */
export async function generateAndSaveTTSAudio(text: string): Promise<string> {
  const audioBuffer = await generateTTSAudio(text)
  const tempPath = join(tmpdir(), `tts-${Date.now()}.mp3`)
  await writeFile(tempPath, audioBuffer)
  return tempPath
}

