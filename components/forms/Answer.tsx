'use client';

import { AnswerSchema } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage
} from '../ui/form';
import { Editor } from '@tinymce/tinymce-react';
import { useTheme } from '@/context/ThemeProvider';
import { Button } from '../ui/button';
import { useState } from 'react';
import Image from 'next/image';

const Answer = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mode } = useTheme();

  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      answer: ''
    }
  });

  const handleCreateAnswer = (data) => {};

  return (
    <div>
      <div className="flex flex-col justify-between sm:flex-row sm:items-center sm:gap-2">
        <h4 className="paragraph-semibold text-dark400_light800">
          Write your answer here
        </h4>
        <Button
          className="btn light-border-2 text-primary-500 dark:text-primary-500 gap-1.5 rounded-md px-4 py-2.5 shadow-none"
          onClick={() => {}}>
          <Image
            src="/assets/icons/stars.svg"
            alt="star"
            width={12}
            height={12}
            className="object-contain"
          />
          Generate an AI Answer
        </Button>
      </div>
      <Form {...form}>
        <form
          className="mt-6 flex w-full flex-col gap-10"
          onSubmit={form.handleSubmit(handleCreateAnswer)}>
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormControl className="mt-3.5">
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                    init={{
                      height: 350,
                      plugins: [
                        // Core editing features
                        'anchor',
                        'autolink',
                        'charmap',
                        'codesample',
                        'emoticons',
                        'link',
                        'lists',
                        //   'media',
                        'searchreplace',
                        //   'table',
                        'visualblocks',
                        'wordcount',
                        // Your account includes a free trial of TinyMCE premium features
                        // Try the most popular premium features until Oct 19, 2025:
                        'checklist',
                        'mediaembed',
                        'casechange',
                        'formatpainter',
                        'pageembed',
                        'a11ychecker',
                        'tinymcespellchecker',
                        'permanentpen',
                        'powerpaste',
                        'advtable',
                        'advcode',
                        'advtemplate',
                        'ai',
                        'uploadcare',
                        'mentions',
                        'tinycomments',
                        'tableofcontents',
                        'footnotes',
                        'mergetags',
                        'autocorrect',
                        'typography',
                        'inlinecss',
                        'markdown',
                        'importword',
                        'exportword',
                        'exportpdf'
                      ],
                      menubar: false,
                      toolbar:
                        'undo redo | codesample | blocks fontfamily:Inter fontsize | bold italic underline strikethrough | spellcheckdialog a11ycheck typography uploadcare | align lineheight | checklist numlist bullist indent outdent',
                      tinycomments_mode: 'embedded',
                      tinycomments_author: 'Author name',
                      mergetags_list: [
                        { value: 'First.Name', title: 'First Name' },
                        { value: 'Email', title: 'Email' }
                      ],
                      // ai_request: (request, respondWith) =>
                      //   respondWith.string(() =>
                      //     Promise.reject('See docs to implement AI Assistant')
                      //   ),
                      uploadcare_public_key: '59eac4a3a4e78f24886e',
                      skin: mode === 'dark' ? 'oxide-dark' : 'oxide',
                      content_css: mode === 'dark' ? 'dark' : 'light'
                    }}
                    onBlur={field.onBlur}
                    onEditorChange={(content) => field.onChange(content)}
                  />
                </FormControl>
                <FormDescription className="text-light-500 body-regular mt-2.5">
                  Introduce the problem and expand what you put in the title.
                  Minimum 20 character.
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button
              type="submit"
              className="primary-gradient w-fit text-white"
              disabled={isSubmitting}>
              {isSubmitting ? 'Submitting' : 'Submit'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Answer;
