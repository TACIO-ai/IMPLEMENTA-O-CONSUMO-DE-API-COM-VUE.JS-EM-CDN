const { createApp } = Vue;

createApp({
    data() {
        return {
            posts: [],
            filteredPosts: [],
            loading: true,
            newPost: { title: '', body: '', author: '' },
            searchTerm: '',
            currentPage: 1,
            itemsPerPage: 3,
            editingPost: null
        }
    },
    computed: {
        totalPages() {
            return Math.ceil(this.filteredPosts.length / this.itemsPerPage);
        },
        paginatedPosts() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + Number(this.itemsPerPage);
            return this.filteredPosts.slice(start, end);
        }
    },
    mounted() {
        this.fetchPosts();
    },
    methods: {
        fetchPosts() {
            // Simulando chamada à API com dados mockados
            setTimeout(() => {
                this.posts = [
                    {
                        id: 1,
                        title: "Consegui meu primeiro emprego como desenvolvedor!",
                        body: "Hoje foi um dia incrível! Finalmente consegui minha primeira oportunidade como desenvolvedor júnior em uma startup de tecnologia.",
                        author: "Ana Silva"
                    },
                    {
                        id: 2,
                        title: "Dicas para aprender Vue.js rápido",
                        body: "Depois de 3 meses estudando Vue.js, quero compartilhar o que funcionou para mim: 1) Fazer projetos pequenos, 2) Usar a documentação oficial.",
                        author: "Carlos Oliveira"
                    },
                    {
                        id: 3,
                        title: "Minha experiência no hackathon",
                        body: "Participei do meu primeiro hackathon no fim de semana e foi incrível! Nossa equipe desenvolveu um app para ajudar pequenos negócios em apenas 48 horas.",
                        author: "Mariana Costa"
                    },
                    {
                        id: 4,
                        title: "Por que decidi migrar para TI",
                        body: "Depois de 5 anos trabalhando com marketing, tomei a decisão de mudar para área de tecnologia. No começo foi assustador, mas cada dia me sinto mais certa da minha escolha.",
                        author: "Joana Pereira"
                    },
                    {
                        id: 5,
                        title: "Projeto open source que estou contribuindo",
                        body: "Comecei a contribuir com um projeto de código aberto que ajuda pessoas a aprenderem programação. É desafiador mas muito recompensador!",
                        author: "Ricardo Almeida"
                    }
                ];
                this.filteredPosts = [...this.posts];
                this.loading = false;
            }, 1000);
        },
        filterPosts() {
            if (!this.searchTerm) {
                this.filteredPosts = [...this.posts];
             } else {}
                const term = this.searchTerm.toLowerCase();
                this.filteredPosts = this.posts.filter(post => 
                    post.title.toLowerCase().includes(term) || 
                    post.body.toLowerCase().includes(term) || 
                    post.author.toLowerCase().includes(term) 
                );
             this.currentPage = 1; // Reset para a primeira página
        },
        addPost() {
            const newId = this.posts.length > 0 
        ? Math.max(...this.posts.map(post => post.id)) + 1 
        : 1;
    
    const newPost = {
        id: newId,
        title: this.newPost.title,
        body: this.newPost.body,
        author: this.newPost.author
    };
    
    this.posts.unshift(newPost);
    this.filteredPosts.unshift(newPost);
    this.newPost = { title: '', body: '', author: '' };
    this.filterPosts(); // Reaplica o filtro
},

        enableEdit(post) {
            post.editing = true;
            post.editTitle = post.title;
            post.editBody = post.body;
            post.editAuthor = post.author;
        },
        saveEdit(post) {
            post.title = post.editTitle;
            post.body = post.editBody;
            post.author = post.editAuthor;
            post.editing = false;
            this.filterPosts(); // Atualiza a lista filtrada
        },
        cancelEdit(post) {
            post.editing = false;
        },
        deletePost(id) {
            if (confirm('Tem certeza que deseja excluir este post?')) {
                this.posts = this.posts.filter(post => post.id !== id);
                this.filterPosts(); // Atualiza a lista filtrada
            }
        },
        changePagination() {
            this.currentPage = 1;
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        goToPage(page) {
            this.currentPage = page;
        }
    }
}).mount('#app');