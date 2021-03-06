module.exports = {
    title: "Tailwind",
    description: 'Just playing around',
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
        ]
    },
    markdown: {
        /**
         * Add class named to html generated by Markdown
         */
        extendMarkdown: md => {
            /**
             * Use Highlight JS for Markdown code blocks
             */
            md.use(require('markdown-it-highlightjs'), {})
        },
        anchor: { permalink: false },
    },
    postcss: {
        plugins: [
            require("tailwindcss")("./tailwind.config.js"),
            require('cssnano'),
            require('@fullhuman/postcss-purgecss')({

                content: [
                    '.vuepress/theme/**/*.vue',
                    '.vuepress/theme/**/*.md',
                    '.vuepress/theme/**/*.js',
                    '.vuepress/theme/templates/*.html',
                    '.vuepress/theme/styles/*.styl',
                ],

                extractors: [
                    {
                        /**
                         * A fix for purge css to pick up class names with escaped chars
                         * E.g. md:w-1/2.
                         * 
                         * Solution from https://github.com/tailwindcss/tailwindcss/issues/391#issuecomment-366922730
                         */
                        extractor: class TailwindExtractor {
                            static extract(content) {
                                return content.match(/[A-z0-9-:\/]+/g) || [];
                            }
                        },
                        extensions: ['css', 'html', 'js', 'vue', 'md', 'styl']
                    }
                ],

                /**
                 * Ensure default resets and normalised classes ar enot removed by PurgeCSS
                 */
                whitelistPatterns: [
                    /^(h\d|p$|ul|li$|div|ol|table|td$|th$|thead|tbody|main|input|button|form|md-|hljs)/
                ],

            }),
            require("autoprefixer")
        ]
    }
}
